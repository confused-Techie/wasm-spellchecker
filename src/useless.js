// This file will export the JS used for this package 
// Meanwhile the AssemblyScript/WASM will be used to quickly execute algorithms against 
// variables passed via the JS 

import * as spell from "../build/release.js";

console.log(spell.hello());

let string1 = "kitten";
let string2 = "sitten";

let startLocal = performance.now();

let localLD = ld(string1, string2);

let endLocal = performance.now() - startLocal;

console.log(`Local: ${string1}-${string2}: Got ${localLD} in ${endLocal}ms`);

let startRemote = performance.now();

let remoteLD = spell.ld(string1, string2);

let endRemote = performance.now() - startRemote;

console.log(`Remote: ${string1}-${string2}: Got ${remoteLD} in ${endRemote}ms`);

let wordList = [ "to", "the", "far", "worst", "world", "worldo", "worldoe", "worldoet", "worldoety" ];
let word = "the";

let lStartBS = performance.now();
let lBS = binarySearch(word, wordList);
let lEndBS = performance.now() - lStartBS;

let lStartN = performance.now();
let lBN = wordList.includes(word);
let lEndN = performance.now() - lStartN;

console.log(`Local-BinarySearch: Is ${word} a Word? ${lBS} in ${lEndBS}ms`);
console.log(`Native-Search: Is ${word} a Word? ${lBN} in ${lEndN}ms`);

function binarySearch(value, list) {
  if (list[list.length/2] % 0) {
    // if divisble by 2 
    let tOb = topOrBottom(value, list);
    
    if (tOb > 0) {
      return binarySearch(value, list.split(0, list.length/2));
    } else {
      return binarySearch(value, list.split(list.length/2));
    }
  } else {
    // no longer divisble by two. Search normally
    for (let i = 0; i < list.length; i++) {
      if (value == list[i]) {
        return true;
      }
    }
    return false;
  }
}

function topOrBottom(value, list) {
  if (value.length > list[list.length/2].length) {
    return 1;
  } else {
    return -1;
  }
}

function ld(s1, s2) {
  let longer = s1;
  let shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  let longerLength = longer.length;
  if (longerLength === 0) {
    return 1.0;
  }
  return (
    (longerLength - ldED(longer, shorter)) / parseFloat(longerLength)
  );
}

function ldED(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();
  
  let costs = new Array();
  for (let p = 0; p < s1.length; p++) {
    let lastValue = p;
    for (let q = 0; q < s2.length; q++) {
      if (p === 0) {
        costs[q] = q;
      } else {
        if (q > 0) {
          let newValue = costs[q-1];
          if (s1.charAt(p-1) != s2.charAt(q-1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[q]) + 1;
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

-----

// This file will export the JS used for this package 
// Meanwhile the AssemblyScript/WASM will be used to quickly execute algorithms against 
// variables passed via the JS 

//import * as fs from "fs";
//import * as spell from "../build/release.js";

const fs = require("fs");
const path = require("path");

const wasmBuffer = fs.readFileSync("./build/release.wasm");
WebAssembly.instantiate(wasmBuffer).then(wasmModule => {
  const { addDict, isMisspelled } = wasmModule.instance.exports;
  
  // now during the initial load, we will collect our dict and pass it to our AssemplyScript 
  const start = performance.now();
  
  //const filePath = new URL("../dicts/english_large.txt", import.meta.url);
  const filePath = path.join(__dirname, "../dicts/english_lage.txt");
  const en_dict = fs.readFileSync(filePath).toString().replace(/\r\n/g, "\n").split("\n");
  
  const endDict = performance.now() - start;
  
  const startMap = performance.now();
  
  spell.addDict(en_dict);
  
  const endMap = performance.now() - startMap;
  const total = performance.now() - start;
  
  console.log(`Read: ${endDict}ms - Map: ${endMap}ms - Total: ${total}ms`);
  
  const testStart = performance.now();
  
  let misspelled = spell.isMisspelled("teh");
  
  const testEnd = performance.now() - testStart;
  
  console.log(`'teh' is misspelled: ${misspelled} - ${testEnd}ms`);
  
  let used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`Using ${Math.round(used * 100) / 100} MB`);
  
  module.exports = {
    used,
  };
  
});
