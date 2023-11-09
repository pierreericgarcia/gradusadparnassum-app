import {
  findIntervalByNotes,
  findNoteByInterval,
  intervals,
} from './intervals';

export const chords = {
  major: {
    id: 'major',
    label: 'Majeur',
    intervals: [
      intervals.unison,
      intervals.major_third,
      intervals.perfect_fifth,
    ],
  },
  minor: {
    id: 'minor',
    label: 'Mineur',
    intervals: [
      intervals.unison,
      intervals.minor_third,
      intervals.perfect_fifth,
    ],
  },
  diminished: {
    id: 'diminished',
    label: 'Diminué',
    intervals: [
      intervals.unison,
      intervals.minor_third,
      intervals.diminished_fifth,
    ],
  },
  augmented: {
    id: 'augmented',
    label: 'Augmenté',
    intervals: [
      intervals.unison,
      intervals.major_third,
      intervals.augmented_fifth,
    ],
  },
  major_seventh: {
    id: 'major_seventh',
    label: 'Septième Majeure',
    intervals: [
      intervals.unison,
      intervals.major_third,
      intervals.perfect_fifth,
      intervals.major_seventh,
    ],
  },
  minor_seventh: {
    id: 'minor_seventh',
    label: 'Septième Mineure',
    intervals: [
      intervals.unison,
      intervals.minor_third,
      intervals.perfect_fifth,
      intervals.minor_seventh,
    ],
  },
  dominant_seventh: {
    id: 'dominant_seventh',
    label: 'Septième de Dominante',
    intervals: [
      intervals.unison,
      intervals.major_third,
      intervals.perfect_fifth,
      intervals.minor_seventh,
    ],
  },
  half_diminished_seventh: {
    id: 'half_diminished_seventh',
    label: 'Septième Mineure et Quinte Diminuée',
    intervals: [
      intervals.unison,
      intervals.minor_third,
      intervals.diminished_fifth,
      intervals.minor_seventh,
    ],
  },
  fully_diminished_seventh: {
    id: 'fully_diminished_seventh',
    label: 'Septième Diminuée',
    intervals: [
      intervals.unison,
      intervals.minor_third,
      intervals.diminished_fifth,
      intervals.diminished_seventh,
    ],
  },
};

export const createChord = (note, chord) => {
  const chordNotes = chord.intervals.map(interval =>
    findNoteByInterval(note, interval),
  );

  return {
    id: `${note.id}_${chord.id}`,
    label: `${note.label} ${chord.label}`,
    notes: chordNotes,
    quality: chord,
  };
};

export const findChordByNotes = notes => {
  if (notes.length < 3) {
    throw new Error('At least three notes are required to determine a chord.');
  }

  const computedIntervals = [];
  for (let i = 0; i < notes.length; i++) {
    computedIntervals.push(findIntervalByNotes(notes[0], notes[i]));
  }

  return Object.values(chords).find(chord =>
    computedIntervals.every(
      (computedInterval, i) => computedInterval.id === chord.intervals[i]?.id,
    ),
  );
};

export const createNaturalDegreeChord = (
  degreeIndex,
  scaleNotes,
  chordLength = 3,
) => {
  const naturalDegreeChordNotes = [];
  naturalDegreeChordNotes.push(scaleNotes[degreeIndex % scaleNotes.length]);

  for (let i = 1; i < chordLength; i++) {
    naturalDegreeChordNotes.push(
      scaleNotes[(degreeIndex + i * 2) % scaleNotes.length],
    );
  }

  const naturalDegreeChord = findChordByNotes(naturalDegreeChordNotes);
  return createChord(naturalDegreeChordNotes[0], naturalDegreeChord);
};
