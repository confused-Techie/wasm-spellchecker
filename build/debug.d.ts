/** Exported memory */
export declare const memory: WebAssembly.Memory;
/**
 * assembly/index/hello
 * @returns `~lib/string/String`
 */
export declare function hello(): string;
/**
 * assembly/index/addDict
 * @param dict `~lib/array/Array<~lib/string/String>`
 */
export declare function addDict(dict: Array<string>): void;
/**
 * assembly/index/isMisspelled
 * @param word `~lib/string/String`
 * @returns `bool`
 */
export declare function isMisspelled(word: string): boolean;
/**
 * assembly/index/sizeOfDict
 * @returns `i32`
 */
export declare function sizeOfDict(): number;
