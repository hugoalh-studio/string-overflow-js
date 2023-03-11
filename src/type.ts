import { type StringDissectorOptions } from "@hugoalh/string-dissect";

interface StringOverflowTruncatorOptions extends StringDissectorOptions {
	/** Ellipsis mark of the target string. [Default: `"..."`] */
	ellipsisMark?: string;
	/** Ellipsis position at the target string. [Default: `"End"`] */
	ellipsisPosition?: string;
}
export {
	type StringOverflowTruncatorOptions
};
