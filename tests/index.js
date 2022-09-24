const assert = require("assert");
const spell = require("../src/requireWASM.js");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../dicts/english_large.txt");
const en_dict = fs.readFileSync(filePath).toString().replace(/\r\n/g, "\n").split("\n");

spell.loadEvent.addListener("loaded", test);

function test() {
  spell.addDict(en_dict);
  
  assert.strictEqual(spell.hello(), "hello world");
  
  assert.strictEqual(spell.isMisspelled("the"), false);
  
  assert.strictEqual(spell.isMisspelled("teh"), true);
  
  console.log("ok");
}
