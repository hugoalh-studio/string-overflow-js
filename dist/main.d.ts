import { type StringDissectorOptions } from "@hugoalh/string-dissect";
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
export declare class StringOverflowTruncator {
    #private;
    /**
     * Initialize string truncator.
     * @param {number} maximumLength Maximum length of the target string.
     * @param {StringOverflowTruncatorOptions} [options={}] Options.
     */
    constructor(maximumLength: number, options?: StringOverflowTruncatorOptions);
    /**
     * Truncate the string.
     * @param {string} item String that need to truncate.
     * @param {number} [maximumLengthOverride] Override the preset maximum length of the target string.
     * @returns {string} A truncated string.
     */
    truncate(item: string, maximumLengthOverride?: number): string;
    /**
     * Truncate the string with the specify length; Safe with the emojis, URLs, and words.
     * @param {string} item String that need to truncate.
     * @param {number} maximumLength Maximum length of the target string.
     * @param {StringOverflowTruncatorOptions} [options={}] Options.
     * @returns {string} A truncated string.
     */
    static truncate(item: string, maximumLength: number, options?: StringOverflowTruncatorOptions): string;
}
export default StringOverflowTruncator;
/**
 * Truncate the string with the specify length; Safe with the emojis, URLs, and words.
 * @param {string} item String that need to truncate.
 * @param {number} maximumLength Maximum length of the target string.
 * @param {StringOverflowTruncatorOptions} [options={}] Options.
 * @returns {string} A truncated string.
 */
export declare function stringOverflow(item: string, maximumLength: number, options?: StringOverflowTruncatorOptions): string;
//# sourceMappingURL=main.d.ts.map