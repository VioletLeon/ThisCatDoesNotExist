import Head from 'next/head';
import makeImprovGenerators from './makeImprovGenerators';
import omniGrammar from '../improvgrammar/all';
import Alea from 'alea';
import queryString from 'query-string';
import { shuffle } from './util';
import { useEffect, useState } from 'react';

export default function Home() {
  const [seed, setSeed] = useState({});
  const [pages, setPages] = useState(4);

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
  }

  function chunk(len, arr) {
    var chunks = [],
      i = 0,
      n = arr.length;
    while (i < n) {
      chunks.push(arr.slice(i, (i += len)));
    }
    return chunks;
  }

  function reactToHash(parsedHash, shouldSetHash) {
    if (parsedHash.seed && !isNaN(parseInt(parsedHash.seed, 10))) {
      seed.value = parseInt(parsedHash.seed, 10);
      console.log('Set seed:', seed.value);
    }
    if (parsedHash.pages) {
      // pages.value = parseInt(parsedHash.pages, 10);
    }
    if (seed.value) {
      derive(shouldSetHash);
      return true;
    } else {
      return false;
    }
  }

  if (typeof window !== 'undefined') {
    const purposeOptions = omniGrammar.nameOfCat.groups.map(
      ({ tags, phrases }) => [tags[0], phrases[0]]
    );

    const initialParsedHash = queryString.parse(window.location.hash);

    if (initialParsedHash.pages) {
      pages.value = parseInt(initialParsedHash.pages, 10);
    }

    const numBrandRepetitions = parseInt(
      initialParsedHash.numBrandRepetitions || '1',
      10
    );

    const sections = useEffect(() => {
      if (!catalog) return [];
      const alea = new Alea(seed.value);
      return purposeOptions.map(([tag, title]) => ({
        title,
        tags: [tag],
        brands: chunk(
          8,
          shuffle(purposeOptions, alea).flatMap((b) => {
            return [...Array(numBrandRepetitions)].map((_, i) => ({
              bindings: { brand: b },
              key: b.replace(' ', '') + tag.join('') + i,
            }));
          })
        ),
      }));
    });

    const catalog = initialParsedHash.catalog || false;

    if (!reactToHash(queryString.parse(window.location.hash), true)) {
      travel();
    }

    useEffect(() => {
      if (!reactToHash(queryString.parse(window.location.hash), true)) {
        console.log('WHAT IS THIS', sections);
        travel();
      }
      window.onhashchange = () => {
        reactToHash(queryString.parse(window.location.hash), false);
      };
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>This Cat Does Not Exist</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-row items-center justify-center w-full flex-1 px-20 text-center">
        <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          {/* <Entry
            v-for="b in brandchunks"
            v-bind:key="b.key"
            v-bind:bindings="b.bindings"
            v-bind:tags="s.tags"
            v-bind:seed="seed + b.key"
          ></Entry> */}
        </div>
        <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <div className="cat-face">
            <div className="cat-eyes"></div>
            <div className="cat-nose"></div>
            <div className="cat-mouth"></div>
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
