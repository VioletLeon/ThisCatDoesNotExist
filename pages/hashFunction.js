export default function (phrasesArray, seed) {
  return phrasesArray.filter((phrase, mapIndex) => {
    const length = phrasesArray.length - 1;
    const index = seed % length;
    if (index === mapIndex) {
      return phrase;
    }
  });
}
