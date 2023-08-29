import { rotateArray } from '../utils.js';
import { notes } from './notes.js';

export const intervals = {
  unison: {
    id: 'unison',
    label: 'Unisson',
    length: {
      diatonic: 0,
      chromatic: 0,
    },
  },
  minor_second: {
    id: 'minor_second',
    label: 'Seconde Mineure',
    length: {
      diatonic: 1,
      chromatic: 1,
    },
  },
  major_second: {
    id: 'major_second',
    label: 'Seconde Majeure',
    length: {
      diatonic: 1,
      chromatic: 2,
    },
  },
  minor_third: {
    id: 'minor_third',
    label: 'Tierce Mineure',
    length: {
      diatonic: 2,
      chromatic: 3,
    },
  },
  major_third: {
    id: 'major_third',
    label: 'Tierce Majeure',
    length: {
      diatonic: 2,
      chromatic: 4,
    },
  },
  diminished_fourth: {
    id: 'diminished_fourth',
    label: 'Quarte Diminuée',
    length: {
      diatonic: 3,
      chromatic: 4,
    },
  },
  perfect_fourth: {
    id: 'perfect_fourth',
    label: 'Quarte Juste',
    length: {
      diatonic: 3,
      chromatic: 5,
    },
  },
  augmented_fourth: {
    id: 'augmented_fourth',
    label: 'Quarte Augmentée',
    length: {
      diatonic: 3,
      chromatic: 6,
    },
  },
  diminished_fifth: {
    id: 'diminished_fifth',
    label: 'Quinte Diminuée',
    length: {
      diatonic: 4,
      chromatic: 6,
    },
  },
  perfect_fifth: {
    id: 'perfect_fifth',
    label: 'Quinte Juste',
    length: {
      diatonic: 4,
      chromatic: 7,
    },
  },
  augmented_fifth: {
    id: 'augmented_fifth',
    label: 'Quinte Augmentée',
    length: {
      diatonic: 4,
      chromatic: 8,
    },
  },
  minor_sixth: {
    id: 'minor_sixth',
    label: 'Sixte Mineure',
    length: {
      diatonic: 5,
      chromatic: 8,
    },
  },
  major_sixth: {
    id: 'major_sixth',
    label: 'Sixte Majeure',
    length: {
      diatonic: 5,
      chromatic: 9,
    },
  },
  diminished_seventh: {
    id: 'diminished_seventh',
    label: 'Septième Diminuée',
    length: {
      diatonic: 6,
      chromatic: 9,
    },
  },
  minor_seventh: {
    id: 'minor_seventh',
    label: 'Septième Mineure',
    length: {
      diatonic: 6,
      chromatic: 10,
    },
  },
  major_seventh: {
    id: 'major_seventh',
    label: 'Septième Majeure',
    length: {
      diatonic: 6,
      chromatic: 11,
    },
  },
  octave: {
    id: 'octave',
    label: 'Octave',
    length: {
      diatonic: 7,
      chromatic: 12,
    },
  },
};

const calculateTargetIndices = (baseNote, interval, descendant) => {
  const calculateIndex = (index, length, total) => {
    return (index + (descendant ? -length : length) + total) % total;
  };

  return {
    chromatic: calculateIndex(
      baseNote.index.chromatic,
      interval.length.chromatic,
      12,
    ),
    diatonic: calculateIndex(
      baseNote.index.diatonic,
      interval.length.diatonic,
      7,
    ),
  };
};

export const findNoteByInterval = (baseNote, interval, descendant = false) => {
  const { chromatic: targetChromaticIndex, diatonic: targetDiatonicIndex } =
    calculateTargetIndices(baseNote, interval, descendant);

  return Object.values(notes).find(
    note =>
      note.index.chromatic === targetChromaticIndex &&
      note.index.diatonic === targetDiatonicIndex,
  );
};

export const findIntervalByNotes = (startNote, endNote) => {
  const chromaticDiff =
    (endNote.index.chromatic - startNote.index.chromatic + 12) % 12;
  const diatonicDiff =
    (endNote.index.diatonic - startNote.index.diatonic + 7) % 7;

  return Object.values(intervals).find(
    interval =>
      interval.length.chromatic === chromaticDiff &&
      interval.length.diatonic === diatonicDiff,
  );
};

const getSuccessiveIntervalsFromNotes = (notes, isCyclic = false) => {
  const intervalsList = [];

  for (let i = 0; i < notes.length - 1; i++) {
    const startNote = notes[i];
    const endNote = notes[i + 1];
    const interval = findIntervalByNotes(startNote, endNote);
    intervalsList.push(interval);
  }

  if (isCyclic) {
    const interval = findIntervalByNotes(notes[notes.length - 1], notes[0]);
    intervalsList.push(interval);
  }

  return intervalsList;
};

export const getModeFromNotes = notes => {
  const scaleSuccessiveIntervals = getSuccessiveIntervalsFromNotes(notes, true);

  return Object.values(diatonicModes).find(mode =>
    scaleSuccessiveIntervals.every(
      (scaleInterval, i) => scaleInterval.id === mode.intervals[i].id,
    ),
  );
};

const diatonicIntervals = getSuccessiveIntervalsFromNotes(
  [notes.C, notes.D, notes.E, notes.F, notes.G, notes.A, notes.B],
  true,
);

export const degrees = {
  tonic: {
    id: 'tonic',
    alias: 'I',
    label: 'tonique',
    index: 0,
  },
  supertonic: {
    id: 'supertonic',
    alias: 'II',
    label: 'sus-tonique',
    index: 1,
  },
  mediant: {
    id: 'mediant',
    alias: 'III',
    label: 'médiante',
    index: 2,
  },
  subdominant: {
    id: 'subdominant',
    alias: 'IV',
    label: 'sous-dominante',
    index: 3,
  },
  dominant: {
    id: 'dominant',
    alias: 'V',
    label: 'dominante',
    index: 4,
  },
  superdominant: {
    id: 'superdominant',
    alias: 'VI',
    label: 'sus-dominante',
    index: 5,
  },
  leadingTone: {
    id: 'leadingTone',
    alias: 'VII',
    label: 'sensible',
    index: 6,
  },
  subtonic: {
    id: 'subtonic',
    alias: 'VII',
    label: 'sous-tonique',
    index: 6,
  },
};

export const diatonicModes = {
  major: {
    id: 'major',
    alias: 'Major',
    label: 'Majeur',
    intervals: diatonicIntervals,
    degrees: [
      degrees.tonic,
      degrees.supertonic,
      degrees.mediant,
      degrees.subdominant,
      degrees.dominant,
      degrees.superdominant,
      degrees.leadingTone,
    ],
  },
  // dorian: {
  //     id: 'dorian',
  //     alias: 'Dorien',
  //     label: 'Dorien',
  //     intervals: rotateArray(diatonicIntervals, -1),
  //     degrees: [
  //         degrees.tonic,
  //         degrees.supertonic,
  //         degrees.mediant,
  //         degrees.subdominant,
  //         degrees.dominant,
  //         degrees.superdominant,
  //         degrees.subtonic,
  //     ],
  // },
  // phrygian: {
  //     id: 'phrygian',
  //     alias: 'Phrygien',
  //     label: 'Phrygien',
  //     intervals: rotateArray(diatonicIntervals, -2),
  // },
  // lydian: {
  //     id: 'lydian',
  //     alias: 'Lydien',
  //     label: 'Lydien',
  //     intervals: rotateArray(diatonicIntervals, -3),
  // },
  // mixolydian: {
  //     id: 'mixolydian',
  //     alias: 'Mixolydien',
  //     label: 'Mixolydien',
  //     intervals: rotateArray(diatonicIntervals, -4),
  // },
  minor: {
    id: 'minor',
    alias: 'Minor',
    label: 'Mineur',
    intervals: rotateArray(diatonicIntervals, -5),
    degrees: [
      degrees.tonic,
      degrees.supertonic,
      degrees.mediant,
      degrees.subdominant,
      degrees.dominant,
      degrees.superdominant,
      degrees.subtonic,
    ],
  },
  // locrian: {
  //     id: 'locrian',
  //     alias: 'Locrien',
  //     label: 'Locrien',
  //     intervals: rotateArray(diatonicIntervals, -6),
  // },
};
