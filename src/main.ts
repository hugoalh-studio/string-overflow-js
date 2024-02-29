import { StringDissector, type StringDissectorOptions, type StringSegmentDescriptor } from "@hugoalh/string-dissect";
/**
 * Enum of the string truncate ellipsis position.
 */
export enum StringTruncateEllipsisPosition {
	end = "end",
	End = "end",
	middle = "middle",
	Middle = "middle",
	start = "start",
	Start = "start"
}
/**
 * Key of enum of the string truncate ellipsis position.
 * @deprecated
 */
export type StringTruncateEllipsisPositionStringify = keyof typeof StringTruncateEllipsisPosition;
export interface StringTruncatorOptions extends StringDissectorOptions {
	/**
	 * Ellipsis mark of the target string.
	 * @default "..."
	 */
	ellipsisMark?: string;
	/**
	 * Ellipsis position at the target string.
	 * @default "end"
	 */
	ellipsisPosition?: StringTruncateEllipsisPosition | keyof typeof StringTruncateEllipsisPosition;
}
/**
 * Check length.
 * @access private
 * @param {number} maximumLength Maximum length of the target string.
 * @param {number} ellipsisMarkLength Ellipsis mark length of the target string.
 * @returns {void}
 */
function checkLength(maximumLength: number, ellipsisMarkLength: number): void {
	if (!(Number.isSafeInteger(maximumLength) && maximumLength >= 0)) {
		throw new RangeError(`Argument \`maximumLength\` is not a number which is integer, positive, and safe!`);
	}
	if (ellipsisMarkLength > maximumLength) {
		throw new Error(`Ellipsis string is too long!`);
	}
}
/**
 * String truncator to truncate the string with the specify length; Safe with the emojis, URLs, and words.
 */
export class StringTruncator {
	#ellipsisMark = "...";
	#ellipsisPosition: StringTruncateEllipsisPosition = StringTruncateEllipsisPosition.End;
	#maximumLength: number;
	#resultLengthMaximum: number;
	#stringDissector: StringDissector;
	/**
	 * Initialize string truncator.
	 * @param {number} maximumLength Maximum length of the target string.
	 * @param {StringTruncatorOptions} [options={}] Options.
	 */
	constructor(maximumLength: number, options: StringTruncatorOptions = {}) {
		if (typeof options.ellipsisMark !== "undefined") {
			this.#ellipsisMark = options.ellipsisMark;
		}
		if (typeof options.ellipsisPosition !== "undefined") {
			const value: StringTruncateEllipsisPosition | undefined = StringTruncateEllipsisPosition[options.ellipsisPosition];
			if (typeof value === "undefined") {
				throw new RangeError(`\`${options.ellipsisPosition}\` is not a valid ellipsis position! Only accept these values: ${Array.from<string>(new Set(Object.keys(StringTruncateEllipsisPosition).sort()).values()).join(", ")}`);
			}
			this.#ellipsisPosition = value;
		}
		checkLength(maximumLength, this.#ellipsisMark.length);
		this.#maximumLength = maximumLength;
		this.#resultLengthMaximum = this.#maximumLength - this.#ellipsisMark.length;
		this.#stringDissector = new StringDissector({
			locales: options.locales,
			removeANSI: options.removeANSI,
			safeURLs: options.safeURLs,
			safeWords: options.safeWords
		});
	}
	/**
	 * Truncate the string.
	 * @param {string} item String that need to truncate.
	 * @param {number} [maximumLengthOverride] Override the defined maximum length of the target string.
	 * @returns {string} A truncated string.
	 */
	truncate(item: string, maximumLengthOverride?: number): string {
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
		let resultLengthEnd = 0;
		let resultLengthStart = 0;
		switch (this.#ellipsisPosition) {
			case "end":
				resultLengthStart = resultLengthMaximum;
				break;
			case "middle": {
				const resultLengthHalf: number = Math.floor(resultLengthMaximum / 2);
				resultLengthStart = resultLengthHalf;
				resultLengthEnd = resultLengthHalf;
			}
				break;
			case "start":
				resultLengthEnd = resultLengthMaximum;
				break;
		}
		const stringSegments: string[] = Array.from<StringSegmentDescriptor, string>(this.#stringDissector.dissect(item), (segment: StringSegmentDescriptor): string => {
			return segment.value;
		});
		let resultStringStart = "";
		for (let index = 0; index < stringSegments.length; index += 1) {
			const segment: string = stringSegments[index];
			if (resultStringStart.length + segment.length > resultLengthStart) {
				break;
			}
			resultStringStart = `${resultStringStart}${segment}`;
		}
		let resultStringEnd = "";
		for (let index: number = stringSegments.length - 1; index >= 0; index -= 1) {
			const segment: string = stringSegments[index];
			if (resultStringEnd.length + segment.length > resultLengthEnd) {
				break;
			}
			resultStringEnd = `${segment}${resultStringEnd}`;
		}
		return `${resultStringStart}${this.#ellipsisMark}${resultStringEnd}`;
	}
	/**
	 * Truncate the string with the specify length; Safe with the emojis, URLs, and words.
	 * @param {string} item String that need to truncate.
	 * @param {number} maximumLength Maximum length of the target string.
	 * @param {StringTruncatorOptions} [options={}] Options.
	 * @returns {string} A truncated string.
	 */
	static truncate(item: string, maximumLength: number, options: StringTruncatorOptions = {}): string {
		return new this(maximumLength, options).truncate(item);
	}
}
export default StringTruncator;
/**
 * Truncate the string with the specify length; Safe with the emojis, URLs, and words.
 * @param {string} item String that need to truncate.
 * @param {number} maximumLength Maximum length of the target string.
 * @param {StringTruncatorOptions} [options={}] Options.
 * @returns {string} A truncated string.
 */
export function stringTruncate(item: string, maximumLength: number, options: StringTruncatorOptions = {}): string {
	return new StringTruncator(maximumLength, options).truncate(item);
}
