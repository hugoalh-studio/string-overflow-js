import { type StringOverflowTruncatorOptions } from "./type.js";
/**
 * @function stringOverflow
 * @description Truncate the string with the specify length; Safe with the emojis, URLs, and words.
 * @param {string} item String that need to truncate.
 * @param {number} maximumLength Maximum length of the target string.
 * @param {object} [param2={}] Options.
 * @param {string} [param2.ellipsisMark="..."] Ellipsis mark of the target string.
 * @param {string} [param2.ellipsisPosition="End"] Ellipsis position at the target string.
 * @param {boolean} [param2.safeURLs=true] Whether to prevent URLs get truncated at the target string thus cause issues.
 * @param {boolean} [param2.safeWords=true] Whether to prevent words get truncated at the target string.
 * @returns {string} A truncated string.
 */
declare function stringOverflow(item: string, maximumLength: number, { ellipsisMark, ellipsisPosition, safeURLs, safeWords }?: StringOverflowTruncatorOptions): string;
export { stringOverflow };
//# sourceMappingURL=string-overflow.d.ts.map