import omniGrammar from '../improvGrammar/all';

function hash(phrasesArray, seed) {
  return phrasesArray.filter((phrase, mapIndex) => {
    const length = phrasesArray.length - 1;
    const index = seed % length;
    if (index === mapIndex) {
      return phrase;
    }
  });
}

export default function (seed) {
  const catInfo = {};
  catInfo['name'] = hash(omniGrammar.nameOfCat.groups[0].phrases, seed)[0];
  catInfo['color'] = hash(omniGrammar.colorOfCat.groups[0].phrases, seed)[0];
  catInfo['species'] = hash(
    omniGrammar.speciesOfCat.groups[0].phrases,
    seed
  )[0];
  catInfo['eyeColor'] = hash(
    omniGrammar.eyeColorOfCat.groups[0].phrases,
    seed
  )[0];
  catInfo['adjectives'] = hash(
    omniGrammar.adjectivesOfCat.groups[0].phrases,
    seed
  )[0];
  catInfo['favFood'] = hash(omniGrammar.foodOfCat.groups[0].phrases, seed)[0];
  catInfo['hobbies'] = hash(
    omniGrammar.hobbiesOfCat.groups[0].phrases,
    seed
  )[0];
  return catInfo;
}
