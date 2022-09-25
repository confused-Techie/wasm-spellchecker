// The entry file of your WebAssembly module.

let dictionary = new Map<string, string>();
let minLD: f64 = 0.5;

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
  return !dictionary.has(word);
}

export function getCorrections(word: string): Map<string, f64> {
  var results = new Map<string, f64>();

  // Currently Maps are not iterable, but this will get all word values
  var dictArray: Array<string> = dictionary.keys();

  // This doesn't work as closures are not supported. :/
  dictArray.forEach(possible => {
    var res: f64 = ld(word, possible);
    if (res > minLD) {
      results.set(possible, res);
    }
  });

  return results;
}

export function ld(s1: string, s2: string): f64 {
  var short: string = s1;
  var long: string = s2;
  if (s1.length < s2.length) {
    short = s2;
    long = s1;
  }
  var longLength: u32 = long.length;
  if (longLength == 0) {
    return 1.0;
  }
  return (
    (longLength - ldED(long, short)) / longLength
  );
}

function ldED(s1: string, s2: string): f64 {
  // Would convert to lower case here
  var costs = new Array<f64>();

  for (let p = 0; p < s1.length; p++) {
    var lastValue: f64 = p;
    for (let q = 0; q < s2.length; q++) {
      if (p ==0) {
        costs[q] = q;
      } else {
        if (q > 0) {
          var newValue: f64 = costs[q-1];
          if (s1.charAt(p-1) != s2.charAt(q-1)) {
            let inlineMath = Math.min(newValue, lastValue);
            newValue = Math.min(inlineMath, costs[q]) + 1;
          }
          costs[q-1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (p > 0) {
      costs[s2.length] = lastValue;
    }
  }
  return costs[s2.length];
}

export function sizeOfDict(): i32 {
  return dictionary.size;
}

export function setMinLD(newLD: f64): f64 {
  minLD = newLD;
  return minLD;
}
