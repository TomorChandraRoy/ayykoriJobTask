import  { useState } from 'react';


const generateTiles = () => {
  return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
};

const replaceConsecutiveLetters = (str) => {
  let result = '';
  let count = 1;

  for (let i = 0; i < str.length; i++) {
    if (i > 0 && str[i] === str[i - 1]) {
      count++;
    } else {
      count = 1;
    }

    if (count === 3) {
      result = result.slice(0, -2) + '_'; // Replace last 3 chars with _
    } else if (count < 3) {
      result += str[i];
    } else if (count > 3) {
      result = result.slice(0, -count + 1) + '_'.repeat(count); // Replace with underscores
    }
  }

  return result;
};

const Alphabet = () => {
  const [outputString, setOutputString] = useState('');

  const handleTileClick = (letter) => {
    const newString = outputString + letter;
    setOutputString(replaceConsecutiveLetters(newString));
  };

  return (
    <div className="text-center">
      <h1 className='mt-5 font-bold'>Alphabet Tiles</h1>
      <div className="grid grid-cols-8 gap-1.5 m-5 mx-auto w-fit">
        {generateTiles().map((letter) => (
          <div
            key={letter}
            className="w-12 h-12 flex items-center justify-center bg-gray-200 border border-gray-300 cursor-pointer text-2xl hover:bg-[#ebd8d8]"
            onClick={() => handleTileClick(letter)}
          >
            {letter}
          </div>
        ))}
      </div>
      <div id="outputString" className=" mb-20 text-2xl">
        {outputString}
      </div>
    </div>
  );
};

export default Alphabet;
