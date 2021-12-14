import Head from 'next/head';
import omniGrammar from '../improvGrammar/all';
import queryString from 'query-string';
import hashFunction from '../helperFunctions/hashFunction';
import { useEffect, useState } from 'react';
import Cat from '../components/cat';

export default function Home() {
  const [seed, setSeed] = useState({ value: null });
  const [catName, setName] = useState('');
  const [catColor, setColor] = useState('');
  const [eyeColor, setEyeColor] = useState('');
  const [catSpecies, setSpecies] = useState('');

  useEffect(() => {
    const nameOfCat = hashFunction(
      omniGrammar.nameOfCat.groups[0].phrases,
      seed.value
    )[0];

    setName(nameOfCat);

    const colorOfCat = hashFunction(
      omniGrammar.colorOfCat.groups[0].phrases,
      seed.value
    )[0];

    setColor(colorOfCat);

    const eyeColorOfCat = hashFunction(
      omniGrammar.eyeColorOfCat.groups[0].phrases,
      seed.value
    )[0];

    setEyeColor(eyeColorOfCat);

    const speciesOfCat = hashFunction(
      omniGrammar.speciesOfCat.groups[0].phrases,
      seed.value
    )[0];

    setSpecies(speciesOfCat);

    console.log(
      'Inside Primary useEffect: ----->',
      nameOfCat,
      colorOfCat,
      eyeColorOfCat,
      catSpecies
    );
  });

  function derive(shouldSetHash) {
    const newHash = `seed=${seed.value}`;
    if (shouldSetHash && newHash != window.location.hash) {
      window.location.hash = newHash;
    }
  }

  function travel() {
    seed.value = Date.now();
    setSeed({ value: seed.value });
    console.log('Traveling to', seed.value);
    derive(true);
  }

  function reactToHash(parsedHash, shouldSetHash) {
    if (parsedHash.seed && !isNaN(parseInt(parsedHash.seed, 10))) {
      seed.value = parseInt(parsedHash.seed, 10);
      console.log('Set seed:', seed.value);
    }
    if (seed.value) {
      derive(shouldSetHash);
      return true;
    } else {
      return false;
    }
  }

  if (typeof window !== 'undefined') {
    if (!reactToHash(queryString.parse(window.location.hash), true)) {
      travel();
    }

    useEffect(() => {
      console.log(omniGrammar.nameOfCat.groups);

      if (!reactToHash(queryString.parse(window.location.hash), true)) {
        travel();
      }
      window.onhashchange = () => {
        reactToHash(queryString.parse(window.location.hash), false);
      };
    });
  }

  if (!catColor || !catName) {
    return <div />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>This Cat Does Not Exist</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <button onClick={() => travel()}> Generate new cat</button>
        <div className="flex flex-row items-center justify-center w-full flex-1 px-20 text-center">
          <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
            <h1>Hello my name is {catName}</h1>
            <h1>Adopt me!</h1>
          </div>
          <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
            <Cat
              catColor={catColor}
              eyeColor={eyeColor}
              catSpecies={catSpecies}
            />
          </div>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-10 ">
        <a
          className="flex items-center justify-center"
          href="https://github.com/VioletLeon"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Cats
        </a>
      </footer>
    </div>
  );
}
