import StringOverflowTruncator from "./string-overflow-truncator.js";
/**
 * @function stringOverflow
 * @description String truncator to truncate the string with the specify length; Safe with the emojis, URLs, and words.
 * @param {string} item String that need to truncate.
 * @param {number} maximumLength Maximum length of the target string.
 * @param {object} [param2={}] Options.
 * @param {string} [param2.ellipsisMark="..."] Ellipsis mark of the target string.
 * @param {string} [param2.ellipsisPosition="End"] Ellipsis position at the target string.
 * @param {boolean} [param2.safeURLs=true] Whether to prevent URLs get truncated at the target string thus cause issues.
 * @param {boolean} [param2.safeWords=true] Whether to prevent words get truncated at the target string.
 * @returns {string} A truncated string.
 */
function stringOverflow(item, maximumLength, { ellipsisMark = "...", ellipsisPosition = "End", safeURLs = true, safeWords = true } = {}) {
    return new StringOverflowTruncator(maximumLength, {
        ellipsisMark,
        ellipsisPosition,
        safeURLs,
        safeWords
    }).truncate(item);
}
export default stringOverflow;
