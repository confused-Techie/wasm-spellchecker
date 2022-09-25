// This file will export the JS used for this package
// Meanwhile the AssemblyScript/WASM will be used to quickly execute algorithms against
// variables passed via the JS

const fs = require("fs");
const path = require("path");
const spell = require("./requireWASM.js");

// define a class, that can be generically used internally, but also exported if need be.

class SpellChecker {
  constructor(loaded = true) {
    this.spell = spell;
    // loaded is defaulting to try, so when another system tries to create a class,
    // it'll assume it can access the underlying spell. But for our internal reference
    // we can correctly define it as false initially, and update it later on.
    this.loaded = loaded;

    // Compatibility Consts
    this.SPELLCHECKER_PREFER_HUNSPELL = "SPELLCHECKER_PREFER_HUNSPELL";
    this.USE_SYSTEM_DEFAULTS = "USE_SYSTEM_DEFAULTS";
    this.ALWAYS_USE_SYSTEM = "ALWAYS_USE_SYSTEM";
    this.ALWAYS_USE_HUNSPELL = "ALWAYS_USE_HUNSPELL";
  }
  isMisspelled(word) {
    if (this.loaded) {
      spell.isMisspelled(word);
    } else {
      // we default to false
      return false;
    }
  }
  getCorrectionsForMisspelling(word) {

  }
  checkSpelling(corpus) {

  }
  checkSpellingAsync(corpus) {

  }
  add(word) {
    if (this.loaded) {
      spell.addDict([ word ]);
    } else {
      // TODO Should use global Atom API's to make this a notification
      console.log(`SpellChecker failed to add ${word} to local dictionary. As its not yet loaded.`);
    }
  }
  setSpellcheckerType(type) {
    // TODO use Atom API's for a notification
    console.log("setSpellcheckerType is no longer supported!");
  }
}

const internalClass = new SpellChecker();

const filePath = path.join(__dirname, "../dicts/english_large.txt");
const en_dict = fs.readFileSync(filePath).toString().replace(/\r\n/g, "\n").split("\n");

spell.loadEvent.addListener("loaded", start);

function start() {
  internalClass.loaded = true;

  spell.addDict(en_dict);

  console.log(spell.hello());
  console.log("the" + spell.isMisspelled("the"));
  console.log("tt" + spell.isMisspelled("tt"));
  console.log("teh" + spell.isMisspelled("tehhhhh"));
  console.log(spell.sizeOfDict());
  console.log(spell.getCorrections("teh"));
}

// Since the . within a class causes a syntax error these need to be exported individually.
module.exports.SpellChecker = SpellChecker;
module.exports.isMisspelled = internalClass.isMisspelled;
module.exports.getCorrectionsForMisspelling = internalClass.getCorrectionsForMisspelling;
module.exports.checkSpelling = internalClass.checkSpelling;
module.exports.checkSpellingAsync = internalClass.checkSpellingAsync;
module.exports.add = internalClass.add;
module.exports.SPELLCHECKER_PREFER_HUNSPELL = internalClass.SPELLCHECKER_PREFER_HUNSPELL;
module.exports.USE_SYSTEM_DEFAULTS = internalClass.USE_SYSTEM_DEFAULTS;
module.exports.ALWAYS_USE_SYSTEM = internalClass.ALWAYS_USE_SYSTEM;
module.exports.ALWAYS_USE_HUNSPELL = internalClass.ALWAYS_USE_HUNSPELL;
