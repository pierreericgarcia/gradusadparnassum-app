export const naturalNotes = {
  C: {
    id: 'C',
    alias: 'C',
    label: 'Do',
    index: {
      chromatic: 0,
      diatonic: 0,
    },
  },
  D: {
    id: 'D',
    alias: 'D',
    label: 'Ré',
    index: {
      chromatic: 2,
      diatonic: 1,
    },
  },
  E: {
    id: 'E',
    alias: 'E',
    label: 'Mi',
    index: {
      chromatic: 4,
      diatonic: 2,
    },
  },
  F: {
    id: 'F',
    alias: 'F',
    label: 'Fa',
    index: {
      chromatic: 5,
      diatonic: 3,
    },
  },
  G: {
    id: 'G',
    alias: 'G',
    label: 'Sol',
    index: {
      chromatic: 7,
      diatonic: 4,
    },
  },
  A: {
    id: 'A',
    alias: 'A',
    label: 'La',
    index: {
      chromatic: 9,
      diatonic: 5,
    },
  },
  B: {
    id: 'B',
    alias: 'B',
    label: 'Si',
    index: {
      chromatic: 11,
      diatonic: 6,
    },
  },
};

export const alterations = {
  sharp: {
    id: 'sharp',
    symbol: '♯',
    label: 'Dièse',
    value: 1,
  },
  flat: {
    id: 'flat',
    symbol: '♭',
    label: 'Bémol',
    value: -1,
  },
};

const alterateNote = (note, alteration) => ({
  ...note,
  id: `${note.id}_${alteration.id}`,
  alias: note.alias + alteration.symbol,
  label: note.label + alteration.symbol,
  index: {
    ...note.index,
    chromatic: note.index.chromatic + alteration.value,
  },
});

const generateAlteredNotes = (naturalNotes, alterations) => {
  return Object.entries(naturalNotes).reduce((acc, [noteKey, noteValue]) => {
    Object.entries(alterations).forEach(([altKey, altValue]) => {
      const alteredNote = alterateNote(noteValue, altValue);
      const propertyName = `${noteKey}_${altKey}`;
      acc[propertyName] = alteredNote;
    });
    return acc;
  }, {});
};

const alteredNotes = generateAlteredNotes(naturalNotes, alterations);

export const notes = {
  ...naturalNotes,
  ...alteredNotes,
};
