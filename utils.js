export const createIncrementalArray = (n, startAtOne = false) => {
  return Array.from({ length: n }, (_, i) => (startAtOne ? i + 1 : i));
};

export const getRandomItem = list =>
  list[Math.floor(Math.random() * list.length)];

export const sanitizeText = text => text.trim().toLowerCase();

export const getRandomIndex = list => Math.floor(Math.random() * list.length);

export const rotateArray = (arr, k) => {
  const len = arr.length;
  k = k % len;

  if (k < 0) {
    k += len;
  }

  return [...arr.slice(-k), ...arr.slice(0, -k)];
};

export const intervalsToText = intervals =>
  intervals
    .map(interval => {
      switch (interval) {
        case 1:
          return 'DT';
        case 2:
          return 'T';

        default:
          return null;
      }
    })
    .join(' - ');

export const toRoman = num => {
  const romanNumerals = [
    { value: 1000, symbol: 'M' },
    { value: 900, symbol: 'CM' },
    { value: 500, symbol: 'D' },
    { value: 400, symbol: 'CD' },
    { value: 100, symbol: 'C' },
    { value: 90, symbol: 'XC' },
    { value: 50, symbol: 'L' },
    { value: 40, symbol: 'XL' },
    { value: 10, symbol: 'X' },
    { value: 9, symbol: 'IX' },
    { value: 5, symbol: 'V' },
    { value: 4, symbol: 'IV' },
    { value: 1, symbol: 'I' },
  ];

  let romanStr = '';

  for (let i = 0; i < romanNumerals.length; i++) {
    while (num >= romanNumerals[i].value) {
      romanStr += romanNumerals[i].symbol;
      num -= romanNumerals[i].value;
    }
  }

  return romanStr;
};

export const capitalize = str =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const secondsToTimeFormat = totalSeconds => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Ajoute un zéro devant si c'est un seul chiffre
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
};
