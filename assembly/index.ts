// The entry file of your WebAssembly module.

let dictionary = new Map<string, string>();

export function hello(): string {
  var a = new Map<string, string>();
  a.set("prop", "hello world");
  return a.get("prop");
}

export function addDict(dict: Array<string>): void {
  dict.forEach(word => {
    dictionary.set(word, "tbd");
  });
}

export function isMisspelled(word: string): bool {
  if (dictionary.has(word)) {
    return false;
  } else {
    return true;
  }
  //return !dictionary.has(word); // This seems to fail.
}

export function sizeOfDict(): i32 {
  return dictionary.size;
}
