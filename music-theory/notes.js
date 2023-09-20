export class Note {
  constructor(base, alteration = null) {
    this.base = base;
    this.alteration = alteration;
  }

  get id() {
    if (this.alteration) {
      return `${this.base.id}_${this.alteration.id}`;
    } else return this.base.id;
  }

  get label() {
    if (this.alteration) {
      return `${this.base.label}${this.alteration.symbol}`;
    } else return this.base.label;
  }

  get index() {
    if (this.alteration) {
      return {
        ...this.base.index,
        chromatic:
          (this.base.index.chromatic + this.alteration.value + 12) % 12,
      };
    } else return this.base.index;
  }
}

const C = new Note({
  id: 'C',
  label: 'Do',
  index: {
    chromatic: 0,
    diatonic: 0,
  },
});
const D = new Note({
  id: 'D',
  label: 'Ré',
  index: {
    chromatic: 2,
    diatonic: 1,
  },
});
const E = new Note({
  id: 'E',
  label: 'Mi',
  index: {
    chromatic: 4,
    diatonic: 2,
  },
});
const F = new Note({
  id: 'F',
  label: 'Fa',
  index: {
    chromatic: 5,
    diatonic: 3,
  },
});
const G = new Note({
  id: 'G',
  label: 'Sol',
  index: {
    chromatic: 7,
    diatonic: 4,
  },
});
const A = new Note({
  id: 'A',
  label: 'La',
  index: {
    chromatic: 9,
    diatonic: 5,
  },
});
const B = new Note({
  id: 'B',
  label: 'Si',
  index: {
    chromatic: 11,
    diatonic: 6,
  },
});

export const naturalNotes = {
  C,
  D,
  E,
  F,
  G,
  A,
  B,
};

export const alterations = {
  sharp: {
    id: 'sharp',
    symbol: '♯',
    label: 'Dièse',
    value: 1,
  },
  doubleSharp: {
    id: 'doubleSharp',
    symbol: '𝄪',
    label: 'Double Dièse',
    value: 2,
  },
  flat: {
    id: 'flat',
    symbol: '♭',
    label: 'Bémol',
    value: -1,
  },
  doubleFlat: {
    id: 'doubleFlat',
    symbol: '𝄫',
    label: 'Double Bémol',
    value: -2,
  },
  becarre: {
    id: 'becarre',
    symbol: '♮',
    label: 'Bécarre',
    value: 0,
  },
};

const generateAlteredNotes = (naturalNotes, alterations) => {
  return Object.values(naturalNotes).reduce((acc, noteValue) => {
    const alteredForThisNote = Object.values(alterations).map(altValue => {
      const alteredNote = new Note(noteValue.base, altValue);
      return [alteredNote.id, alteredNote];
    });
    return { ...acc, ...Object.fromEntries(alteredForThisNote) };
  }, {});
};

const alteredNotes = generateAlteredNotes(naturalNotes, alterations);

export const notes = {
  ...naturalNotes,
  ...alteredNotes,
};
