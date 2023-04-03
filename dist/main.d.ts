import { type StringDissectorOptions } from "@hugoalh/string-dissect";
interface StringOverflowTruncatorOptions extends StringDissectorOptions {
    /**
     * @property ellipsisMark
     * @description Ellipsis mark of the target string.
     * @default "..."
     */
    ellipsisMark?: string;
    /**
     * @property ellipsisPosition
     * @description Ellipsis position at the target string.
     * @default "End"
     */
    ellipsisPosition?: string;
}
/**
 * @class StringOverflowTruncator
 * @description String truncator to truncate the string with the specify length; Safe with the emojis, URLs, and words.
 */
declare class StringOverflowTruncator {
    #private;
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
    constructor(maximumLength: number, { ellipsisMark, ellipsisPosition, safeURLs, safeWords }?: StringOverflowTruncatorOptions);
    /**
     * @method truncate
     * @description Truncate the string.
     * @param {string} item String that need to truncate.
     * @param {number} [maximumLengthOverride] Override the preset maximum length of the target string.
     * @returns {string} A truncated string.
     */
    truncate(item: string, maximumLengthOverride?: number): string;
    /**
     * @static truncate
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
    static truncate(item: string, maximumLength: number, { ellipsisMark, ellipsisPosition, safeURLs, safeWords }?: StringOverflowTruncatorOptions): string;
}
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
export { stringOverflow, StringOverflowTruncator, type StringOverflowTruncatorOptions };
declare const _default: {
    stringOverflow: typeof stringOverflow;
    StringOverflowTruncator: typeof StringOverflowTruncator;
};
export default _default;
//# sourceMappingURL=main.d.ts.map