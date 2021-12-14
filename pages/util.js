export function shuffle(sourceArray, getRandom) {
  const array = sourceArray.slice(0);
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(getRandom() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
