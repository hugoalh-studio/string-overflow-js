import { StringDissector, type StringDescriptor, type StringDissectorOptions } from "@hugoalh/string-dissect";
const ellipsisPositionEndRegExp = /^(?:[Ee](?:nd)?|[Rr](?:ight)?)$/u;
const ellipsisPositionMiddleRegExp = /^(?:[Cc](?:enter)?|[Mm](?:iddle)?)$/u;
const ellipsisPositionStartRegExp = /^(?:[Ll](?:eft)?|[Ss](?:tart)?)$/u;
/**
 * @access private
 * @param {number} maximumLength Maximum length of the target string.
 * @param {number} ellipsisMarkLength Ellipsis mark length of the target string.
 * @returns {void}
 */
function checkLength(maximumLength: number, ellipsisMarkLength: number): void {
	if (!(typeof maximumLength === "number" && !Number.isNaN(maximumLength))) {
		throw new TypeError(`Argument \`maximumLength\` must be type of number!`);
	}
	if (!(Number.isSafeInteger(maximumLength) && maximumLength >= 0)) {
		throw new RangeError(`Argument \`maximumLength\` must be a number which is integer, positive, and safe!`);
	}
	if (ellipsisMarkLength > maximumLength) {
		throw new Error(`Ellipsis string also overflow!`);
	}
}
export interface StringOverflowTruncatorOptions extends StringDissectorOptions {
	/**
	 * Ellipsis mark of the target string.
	 * @default "..."
	 */
	ellipsisMark?: string;
	/**
	 * Ellipsis position at the target string.
	 * @default "End"
	 */
	ellipsisPosition?: string;
}
/**
 * String truncator to truncate the string with the specify length; Safe with the emojis, URLs, and words.
 */
export class StringOverflowTruncator {
	#ellipsisMark = "...";
	#ellipsisPosition: "E" | "M" | "S" = "E";
	#maximumLength: number;
	#resultLengthMaximum: number;
	#stringDissector: StringDissector;
	/**
	 * Initialize string truncator.
	 * @param {number} maximumLength Maximum length of the target string.
	 * @param {StringOverflowTruncatorOptions} [options={}] Options.
	 */
	constructor(maximumLength: number, options: StringOverflowTruncatorOptions = {}) {
		if (typeof options.ellipsisMark === "string") {
			this.#ellipsisMark = options.ellipsisMark;
		} else if (typeof options.ellipsisMark !== "undefined") {
			throw new TypeError(`Argument \`options.ellipsisMark\` must be type of string or undefined!`);
		}
		if (typeof options.ellipsisPosition === "string") {
			if (ellipsisPositionEndRegExp.test(options.ellipsisPosition)) {
				this.#ellipsisPosition = "E";
			} else if (ellipsisPositionMiddleRegExp.test(options.ellipsisPosition)) {
				this.#ellipsisPosition = "M";
			} else if (ellipsisPositionStartRegExp.test(options.ellipsisPosition)) {
				this.#ellipsisPosition = "S";
			} else {
				throw new RangeError(`\`${options.ellipsisPosition}\` is not a valid ellipsis position!`);
			}
		} else if (typeof options.ellipsisPosition !== "undefined") {
			throw new TypeError(`Argument \`options.ellipsisPosition\` must be type of string or undefined!`);
		}
		checkLength(maximumLength, options.ellipsisMark.length);
		this.#maximumLength = maximumLength;
		this.#resultLengthMaximum = maximumLength - options.ellipsisMark.length;
		this.#stringDissector = new StringDissector({
			safeURLs: options.safeURLs,
			safeWords: options.safeWords
		});
	}
	/**
	 * Truncate the string.
	 * @param {string} item String that need to truncate.
	 * @param {number} [maximumLengthOverride] Override the preset maximum length of the target string.
	 * @returns {string} A truncated string.
	 */
	truncate(item: string, maximumLengthOverride?: number): string {
		if (typeof item !== "string") {
			throw new TypeError(`Argument \`item\` must be type of string!`);
		}
		let maximumLength: number = this.#maximumLength;
		let resultLengthMaximum: number = this.#resultLengthMaximum;
		if (typeof maximumLengthOverride !== "undefined") {
			checkLength(maximumLengthOverride, this.#ellipsisMark.length);
			maximumLength = maximumLengthOverride;
			resultLengthMaximum = maximumLengthOverride - this.#ellipsisMark.length;
		}
		if (item.length <= maximumLength) {
			return item;
		}
		let resultLengthLeft = 0;
		let resultLengthRight = 0;
		if (this.#ellipsisPosition === "S") {
			resultLengthRight = resultLengthMaximum;
		} else if (this.#ellipsisPosition === "M") {
			let resultLengthHalf: number = Math.floor(resultLengthMaximum / 2);
			resultLengthLeft = resultLengthHalf;
			resultLengthRight = resultLengthHalf;
		} else {
			resultLengthLeft = resultLengthMaximum;
		}
		let stringGroup: string[] = this.#stringDissector.dissect(item).map((value: StringDescriptor): string => {
			return value.value;
		});
		let resultStringLeftGroup: string[] = [];
		for (let index = 0, resultStringLeftLength = 0; index < stringGroup.length; index += 1) {
			let content: string = stringGroup[index];
			if (resultStringLeftLength + content.length > resultLengthLeft) {
				break;
			}
			resultStringLeftGroup.push(content);
			resultStringLeftLength += content.length;
		}
		let resultStringRightGroup: string[] = [];
		for (let index: number = stringGroup.length - 1, resultStringRightLength = 0; index >= 0; index -= 1) {
			let content: string = stringGroup[index];
			if (resultStringRightLength + content.length > resultLengthRight) {
				break;
			}
			resultStringRightGroup.unshift(content);
			resultStringRightLength += content.length;
		}
		return `${resultStringLeftGroup.join("")}${this.#ellipsisMark}${resultStringRightGroup.join("")}`;
	}
	/**
	 * Truncate the string with the specify length; Safe with the emojis, URLs, and words.
	 * @param {string} item String that need to truncate.
	 * @param {number} maximumLength Maximum length of the target string.
	 * @param {StringOverflowTruncatorOptions} [options={}] Options.
	 * @returns {string} A truncated string.
	 */
	static truncate(item: string, maximumLength: number, options: StringOverflowTruncatorOptions = {}): string {
		return new this(maximumLength, options).truncate(item);
	}
}
export default StringOverflowTruncator;
/**
 * Truncate the string with the specify length; Safe with the emojis, URLs, and words.
 * @param {string} item String that need to truncate.
 * @param {number} maximumLength Maximum length of the target string.
 * @param {StringOverflowTruncatorOptions} [options={}] Options.
 * @returns {string} A truncated string.
 */
export function stringOverflow(item: string, maximumLength: number, options: StringOverflowTruncatorOptions = {}): string {
	return new StringOverflowTruncator(maximumLength, options).truncate(item);
}
