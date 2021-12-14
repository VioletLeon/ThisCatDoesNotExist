import Head from 'next/head';
import omniGrammar from '../improvGrammar/all';
import queryString from 'query-string';
import hashFunction from '../helperFunctions/hashFunction';
import { useEffect, useState } from 'react';
import Cat from '../components/cat';
import db from '../firebase/clientApp';
import {
  onSnapshot,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
} from 'firebase/firestore';

export default function Home() {
  const [seed, setSeed] = useState({ value: null });
  const [catName, setName] = useState('');
  const [catColor, setColor] = useState('');
  const [eyeColor, setEyeColor] = useState('');
  const [catSpecies, setSpecies] = useState('');
  const [owner, getOwner] = useState('');
  const fireStore = db.getFirestore();

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

    // console.log(
    //   'Inside Primary useEffect: ----->',
    //   nameOfCat,
    //   colorOfCat,
    //   eyeColorOfCat,
    //   catSpecies
    // );

    const getData = async () => {
      const seedValue = seed.value + '';
      const ownersRef = doc(fireStore, 'owners', seedValue);
      const docSnap = await getDoc(ownersRef);

      if (docSnap.exists()) {
        const payload = docSnap.data();
        getOwner(payload.payload.ownerName);
      } else {
        console.log('No such document');
      }
    };

    getData();
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
    getOwner('');
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
    <div className="flex flex-col items-center justify-left min-h-screen ">
      <Head>
        <title>This Cat Does Not Exist</title>
        <link rel="icon" href="/favicon.ico" />
        <script
          src="https://kit.fontawesome.com/779f6ba78c.js"
          crossorigin="anonymous"
        ></script>
      </Head>

      <nav className="flex items-center justify-between w-full h-20 bg-blue-300 uppercase text-3xl pl-7 font-mono font-extrabold">
        <div>This Cat Does Not Exist</div>
        <div>
          <a
            href="https://github.com/VioletLeon/ThisCatDoesNotExist"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="transition duration-300 fab fa-github-square pr-3 hover:text-white "></i>
          </a>
          <a
            href="https://www.linkedin.com/in/violetleon/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="transition duration-300 fab fa-linkedin pr-7 hover:text-white"></i>
          </a>
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <button
          className="mt-10 rounded-lg px-4 py-2 bg-blue-300 hover:bg-blue-600 text-black  duration-300"
          onClick={() => travel()}
        >
          Generate new cat
        </button>
        <div className="flex flex-row items-center justify-center w-full flex-1 px-20 text-center">
          <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
            <h1>Hello my name is {catName}</h1>
            {!owner ? (
              <button
                className="mt-10 rounded-lg px-4 py-2 bg-blue-300 hover:bg-blue-600 text-black  duration-300"
                onClick={async () => {
                  const ownerName = await prompt("What's your name?");
                  const seedValue = seed.value + '';
                  const collectionRef = collection(fireStore, 'owners');

                  const payload = {
                    ownerName,
                    seedValue,
                  };

                  await setDoc(doc(collectionRef, seedValue), { payload });
                  getOwner(ownerName);
                }}
              >
                Adopt me!
              </button>
            ) : (
              <h2>My owner is: {owner} </h2>
            )}
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

      <footer className="flex items-center justify-center w-full h-10">
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
