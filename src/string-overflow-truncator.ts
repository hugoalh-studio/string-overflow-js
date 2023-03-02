import { NumberItemFilter } from "@hugoalh/advanced-determine";
import ansiRegExpOriginal from "ansi-regex";
import characterRegExpOriginal from "char-regex";
import emojiRegExpOriginal from "emoji-regex";
import urlRegExpOriginal from "url-regex-safe";
const ansiRegExp = new RegExp(ansiRegExpOriginal().source, "u");
const characterRegExp = new RegExp(characterRegExpOriginal().source, "u");
const emojiRegExp = new RegExp(emojiRegExpOriginal().source, "u");
const urlRegExp = new RegExp(urlRegExpOriginal().source, "u");
const ellipsisPositionEndRegExp = /^(?:[Ee](?:nd)?|[Rr](?:ight)?)$/u;
const ellipsisPositionMiddleRegExp = /^(?:[Cc](?:enter)?|[Mm](?:iddle)?)$/u;
const ellipsisPositionStartRegExp = /^(?:[Ll](?:eft)?|[Ss](?:tart)?)$/u;
const numberIPSFilter = new NumberItemFilter({
	integer: true,
	positive: true,
	safe: true
});
const wordsRegExp = /[\d\w]+(?:[~@#$%&*_'.-][\d\w]+)*/u;
/**
 * @access private
 * @function checkLength
 * @param {number} maximumLength Maximum length of the target string.
 * @param {number} ellipsisMarkLength Ellipsis mark length of the target string.
 * @returns {void}
 */
function checkLength(maximumLength: number, ellipsisMarkLength: number): void {
	if (!numberIPSFilter.test(maximumLength)) {
		throw new TypeError(`Argument \`maximumLength\` must be type of number (integer, positive, and safe)!`);
	}
	if (ellipsisMarkLength > maximumLength) {
		throw new Error(`Ellipsis string also overflow!`);
	}
}
/**
 * @access private
 * @function stringDissect
 * @param {string} item String that need to dissect.
 * @param {object} [param1={}] Options.
 * @param {boolean} [param1.safeURLs=true] Whether to prevent URLs get truncated at the target string thus cause issues.
 * @param {boolean} [param1.safeWords=true] Whether to prevent words get truncated at the target string.
 * @returns {string[]} A dissected string.
 */
function stringDissect(item: string, {
	safeURLs = true,
	safeWords = true
} = {}): string[] {
	let itemRaw: string = item;
	let result: string[] = [];
	/**
	 * @access private
	 * @function unshiftString
	 * @param {string} content
	 * @returns {void}
	 */
	function unshiftString(content: string): void {
		result.push(content);
		itemRaw = itemRaw.substring(content.length);
	}
	while (itemRaw.length > 0) {
		if (itemRaw.search(ansiRegExp) === 0) {
			unshiftString(itemRaw.match(ansiRegExp)[0]);
			continue;
		}
		if (itemRaw.search(emojiRegExp) === 0) {
			unshiftString(itemRaw.match(emojiRegExp)[0]);
			continue;
		}
		if (safeURLs && itemRaw.search(urlRegExp) === 0) {
			unshiftString(itemRaw.match(urlRegExp)[0]);
			continue;
		}
		if (safeWords && itemRaw.search(wordsRegExp) === 0) {
			unshiftString(itemRaw.match(wordsRegExp)[0]);
			continue;
		}
		if (itemRaw.search(characterRegExp) === 0) {
			unshiftString(itemRaw.match(characterRegExp)[0]);
			continue;
		}
		unshiftString(itemRaw.charAt(0));
	}
	return result;
}
/**
 * @class StringOverflowTruncator
 * @description String truncator to truncate the string with the specify length; Safe with the emojis, URLs, and words.
 */
class StringOverflowTruncator {
	#ellipsisMark: string;
	#ellipsisPosition: string;
	#maximumLength: number;
	#resultLengthMaximum: number;
	#safeURLs: boolean;
	#safeWords: boolean;
	/**
	 * @constructor
	 * @description Initialize string truncator.
	 * @param {number} maximumLength Maximum length of the target string.
	 * @param {object} [param1={}] Options.
	 * @param {string} [param1.ellipsisMark="..."] Ellipsis mark of the target string.
	 * @param {string} [param1.ellipsisPosition="End"] Ellipsis position at the target string.
	 * @param {boolean} [param1.safeURLs=true] Whether to prevent URLs get truncated at the target string thus cause issues.
	 * @param {boolean} [param1.safeWords=true] Whether to prevent words get truncated at the target string.
	 */
	constructor(maximumLength: number, {
		ellipsisMark = "...",
		ellipsisPosition = "End",
		safeURLs = true,
		safeWords = true
	} = {}) {
		if (typeof ellipsisMark !== "string") {
			throw new TypeError(`Argument \`ellipsisMark\` must be type of string!`);
		}
		if (typeof ellipsisPosition !== "string") {
			throw new TypeError(`Argument \`ellipsisPosition\` must be type of string!`);
		}
		if (ellipsisPosition.search(ellipsisPositionEndRegExp) === 0) {
			this.#ellipsisPosition = "E";
		} else if (ellipsisPosition.search(ellipsisPositionMiddleRegExp) === 0) {
			this.#ellipsisPosition = "M";
		} else if (ellipsisPosition.search(ellipsisPositionStartRegExp) === 0) {
			this.#ellipsisPosition = "S";
		} else {
			throw new RangeError(`\`${ellipsisPosition}\` is not a valid ellipsis position!`);
		}
		checkLength(maximumLength, ellipsisMark.length);
		if (typeof safeURLs !== "boolean") {
			throw new TypeError(`Argument \`safeURLs\` must be type of boolean!`);
		}
		if (typeof safeWords !== "boolean") {
			throw new TypeError(`Argument \`safeWords\` must be type of boolean!`);
		}
		this.#ellipsisMark = ellipsisMark;
		this.#maximumLength = maximumLength;
		this.#resultLengthMaximum = maximumLength - ellipsisMark.length;
		this.#safeURLs = safeURLs;
		this.#safeWords = safeWords;
	}
	/**
	 * @method truncate
	 * @description Truncate the string.
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
		let stringGroup: string[] = stringDissect(item, {
			safeURLs: this.#safeURLs,
			safeWords: this.#safeWords
		});
		let resultStringLeftGroup: string[] = [];
		for (let index = 0, resultStringLeftLength = 0; index < stringGroup.length; index++) {
			let content: string = stringGroup[index];
			if (resultStringLeftLength + content.length > resultLengthLeft) {
				break;
			}
			resultStringLeftGroup.push(content);
			resultStringLeftLength += content.length;
		}
		let resultStringRightGroup: string[] = [];
		for (let index: number = stringGroup.length - 1, resultStringRightLength = 0; index >= 0; index--) {
			let content: string = stringGroup[index];
			if (resultStringRightLength + content.length > resultLengthRight) {
				break;
			}
			resultStringRightGroup.unshift(content);
			resultStringRightLength += content.length;
		}
		return `${resultStringLeftGroup.join("")}${this.#ellipsisMark}${resultStringRightGroup.join("")}`;
	}
}
export default StringOverflowTruncator;
