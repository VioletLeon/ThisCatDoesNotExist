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
import confetti from 'canvas-confetti';
import FaceBookShare from '../components/facebookshare';
import TwitterShare from '../components/twitterShare';

export default function Home() {
  const [seed, setSeed] = useState({ value: null });
  const [catName, setName] = useState('');
  const [catColor, setColor] = useState('');
  const [eyeColor, setEyeColor] = useState('');
  const [catSpecies, setSpecies] = useState('');
  const [catAdjective, setAdjective] = useState('');
  const [catFood, setFood] = useState('');
  const [catHobby, setHobby] = useState('');
  const [owner, getOwner] = useState('');
  const fireStore = db.getFirestore();

  useEffect(() => {
    const seededCatData = hashFunction(seed.value);
    console.log('USEEFFECTOBJECT', seededCatData);

    setName(seededCatData.name);
    setColor(seededCatData.color);
    setEyeColor(seededCatData.eyeColor);
    setSpecies(seededCatData.species);
    setAdjective(seededCatData.adjectives);
    setFood(seededCatData.favFood);
    setHobby(seededCatData.hobbies);

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
    console.log('Traveling to', seed.value);
    derive(true);
    setSeed({ value: seed.value });
    getOwner('');
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
    return <div>'Test'</div>;
  }

  return (
    <div className="flex flex-col items-center justify-left min-h-screen ">
      <Head>
        <meta
          property="og:url"
          content="https://this-cat-does-not-exist.vercel.app/"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="This Cat Does Not Exist" />
        <meta
          property="og:description"
          content="Generate a new cat to keep forever!"
        />
        <meta property="og:image" content="https://i.imgur.com/qPHk6xa.png" />
        <title>This Cat Does Not Exist</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="flex items-center justify-between w-full h-20 bg-blue-300 uppercase text-3xl pl-7 font-mono font-extrabold">
        <div>This Cat Does Not Exist</div>
        <div>
          <a
            href="https://github.com/VioletLeon/ThisCatDoesNotExist"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github-square pr-3 text-black transition duration-300 hover:text-white "></i>
          </a>
          <a
            href="https://www.linkedin.com/in/violetleon/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fab fa-linkedin text-black pr-7 transition duration-300  hover:text-white"></i>
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
          <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-left">
            <h1>
              Hello my name is {catName}. I'm{' '}
              {!catAdjective.charAt(1).includes(['a', 'e', 'i', 'o', 'u'])
                ? 'a '
                : 'an '}
              {catAdjective} {catSpecies} that loves {catHobby} and eating{' '}
              {catFood}
            </h1>
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

                  confetti({
                    spread: 180,
                  });
                }}
              >
                Adopt me!
              </button>
            ) : (
              <div>
                <h2 className="mt-10">My owner is: {owner} </h2>
                <FaceBookShare seedValue={seed.value} />
                <TwitterShare seedValue={seed.value} />
              </div>
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
