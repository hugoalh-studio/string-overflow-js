var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _StringOverflowTruncator_ellipsisMark, _StringOverflowTruncator_ellipsisPosition, _StringOverflowTruncator_maximumLength, _StringOverflowTruncator_resultLengthMaximum, _StringOverflowTruncator_safeURLs, _StringOverflowTruncator_safeWords;
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
function checkLength(maximumLength, ellipsisMarkLength) {
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
function stringDissect(item, { safeURLs = true, safeWords = true } = {}) {
    let itemRaw = item;
    let result = [];
    /**
     * @access private
     * @function unshiftString
     * @param {string} content
     * @returns {void}
     */
    function unshiftString(content) {
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
    constructor(maximumLength, { ellipsisMark = "...", ellipsisPosition = "End", safeURLs = true, safeWords = true } = {}) {
        _StringOverflowTruncator_ellipsisMark.set(this, void 0);
        _StringOverflowTruncator_ellipsisPosition.set(this, void 0);
        _StringOverflowTruncator_maximumLength.set(this, void 0);
        _StringOverflowTruncator_resultLengthMaximum.set(this, void 0);
        _StringOverflowTruncator_safeURLs.set(this, void 0);
        _StringOverflowTruncator_safeWords.set(this, void 0);
        if (typeof ellipsisMark !== "string") {
            throw new TypeError(`Argument \`ellipsisMark\` must be type of string!`);
        }
        if (typeof ellipsisPosition !== "string") {
            throw new TypeError(`Argument \`ellipsisPosition\` must be type of string!`);
        }
        if (ellipsisPosition.search(ellipsisPositionEndRegExp) === 0) {
            __classPrivateFieldSet(this, _StringOverflowTruncator_ellipsisPosition, "E", "f");
        }
        else if (ellipsisPosition.search(ellipsisPositionMiddleRegExp) === 0) {
            __classPrivateFieldSet(this, _StringOverflowTruncator_ellipsisPosition, "M", "f");
        }
        else if (ellipsisPosition.search(ellipsisPositionStartRegExp) === 0) {
            __classPrivateFieldSet(this, _StringOverflowTruncator_ellipsisPosition, "S", "f");
        }
        else {
            throw new RangeError(`\`${ellipsisPosition}\` is not a valid ellipsis position!`);
        }
        checkLength(maximumLength, ellipsisMark.length);
        if (typeof safeURLs !== "boolean") {
            throw new TypeError(`Argument \`safeURLs\` must be type of boolean!`);
        }
        if (typeof safeWords !== "boolean") {
            throw new TypeError(`Argument \`safeWords\` must be type of boolean!`);
        }
        __classPrivateFieldSet(this, _StringOverflowTruncator_ellipsisMark, ellipsisMark, "f");
        __classPrivateFieldSet(this, _StringOverflowTruncator_maximumLength, maximumLength, "f");
        __classPrivateFieldSet(this, _StringOverflowTruncator_resultLengthMaximum, maximumLength - ellipsisMark.length, "f");
        __classPrivateFieldSet(this, _StringOverflowTruncator_safeURLs, safeURLs, "f");
        __classPrivateFieldSet(this, _StringOverflowTruncator_safeWords, safeWords, "f");
    }
    /**
     * @method truncate
     * @description Truncate the string.
     * @param {string} item String that need to truncate.
     * @param {number} [maximumLengthOverride] Override the preset maximum length of the target string.
     * @returns {string} A truncated string.
     */
    truncate(item, maximumLengthOverride) {
        if (typeof item !== "string") {
            throw new TypeError(`Argument \`item\` must be type of string!`);
        }
        let maximumLength = __classPrivateFieldGet(this, _StringOverflowTruncator_maximumLength, "f");
        let resultLengthMaximum = __classPrivateFieldGet(this, _StringOverflowTruncator_resultLengthMaximum, "f");
        if (typeof maximumLengthOverride !== "undefined") {
            checkLength(maximumLengthOverride, __classPrivateFieldGet(this, _StringOverflowTruncator_ellipsisMark, "f").length);
            maximumLength = maximumLengthOverride;
            resultLengthMaximum = maximumLengthOverride - __classPrivateFieldGet(this, _StringOverflowTruncator_ellipsisMark, "f").length;
        }
        if (item.length <= maximumLength) {
            return item;
        }
        let resultLengthLeft = 0;
        let resultLengthRight = 0;
        if (__classPrivateFieldGet(this, _StringOverflowTruncator_ellipsisPosition, "f") === "S") {
            resultLengthRight = resultLengthMaximum;
        }
        else if (__classPrivateFieldGet(this, _StringOverflowTruncator_ellipsisPosition, "f") === "M") {
            let resultLengthHalf = Math.floor(resultLengthMaximum / 2);
            resultLengthLeft = resultLengthHalf;
            resultLengthRight = resultLengthHalf;
        }
        else {
            resultLengthLeft = resultLengthMaximum;
        }
        let stringGroup = stringDissect(item, {
            safeURLs: __classPrivateFieldGet(this, _StringOverflowTruncator_safeURLs, "f"),
            safeWords: __classPrivateFieldGet(this, _StringOverflowTruncator_safeWords, "f")
        });
        let resultStringLeftGroup = [];
        for (let index = 0, resultStringLeftLength = 0; index < stringGroup.length; index++) {
            let content = stringGroup[index];
            if (resultStringLeftLength + content.length > resultLengthLeft) {
                break;
            }
            resultStringLeftGroup.push(content);
            resultStringLeftLength += content.length;
        }
        let resultStringRightGroup = [];
        for (let index = stringGroup.length - 1, resultStringRightLength = 0; index >= 0; index--) {
            let content = stringGroup[index];
            if (resultStringRightLength + content.length > resultLengthRight) {
                break;
            }
            resultStringRightGroup.unshift(content);
            resultStringRightLength += content.length;
        }
        return `${resultStringLeftGroup.join("")}${__classPrivateFieldGet(this, _StringOverflowTruncator_ellipsisMark, "f")}${resultStringRightGroup.join("")}`;
    }
}
_StringOverflowTruncator_ellipsisMark = new WeakMap(), _StringOverflowTruncator_ellipsisPosition = new WeakMap(), _StringOverflowTruncator_maximumLength = new WeakMap(), _StringOverflowTruncator_resultLengthMaximum = new WeakMap(), _StringOverflowTruncator_safeURLs = new WeakMap(), _StringOverflowTruncator_safeWords = new WeakMap();
export default StringOverflowTruncator;
