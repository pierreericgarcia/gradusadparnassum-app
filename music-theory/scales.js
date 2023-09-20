import _ from 'lodash';
import { getRandomItem, rotateArray } from '../utils';
import {
  findNoteByInterval,
  getSuccessiveIntervalsFromNotes,
  intervals,
} from './intervals';
import { naturalNotes, notes } from './notes';
const { flatMap, take } = _;

// SCALES PATTERN 📐

const major_scale_pattern = [
  intervals.major_second,
  intervals.major_second,
  intervals.minor_second,
  intervals.major_second,
  intervals.major_second,
  intervals.major_second,
  intervals.minor_second,
];

const harmonic_minor_scale_pattern = [
  intervals.major_second,
  intervals.minor_second,
  intervals.major_second,
  intervals.major_second,
  intervals.minor_second,
  intervals.augmented_second,
  intervals.minor_second,
];

const scales_pattern = {
  major: {
    id: 'major',
    label: 'Majeur',
    modes: [
      {
        id: 'major',
        label: 'Majeur',
        intervals: major_scale_pattern,
      },
      {
        id: 'dorian',
        label: 'Dorien',
        intervals: rotateArray(major_scale_pattern, -1),
      },
      {
        id: 'phrygian',
        label: 'Phrygien',
        intervals: rotateArray(major_scale_pattern, -2),
      },
      {
        id: 'lydian',
        label: 'Lydien',
        intervals: rotateArray(major_scale_pattern, -3),
      },
      {
        id: 'mixolydian',
        label: 'Mixolydien',
        intervals: rotateArray(major_scale_pattern, -4),
      },
      {
        id: 'natural_minor',
        label: 'Mineur Naturel',
        intervals: rotateArray(major_scale_pattern, -5),
      },
      {
        id: 'locrian',
        label: 'Locrien',
        intervals: rotateArray(major_scale_pattern, -6),
      },
    ],
  },
  harmonic_minor: {
    id: 'harmonic_minor',
    label: 'Mineur Harmonique',
    modes: [
      {
        id: 'harmonic_minor',
        label: 'Mineur Harmonique',
        intervals: harmonic_minor_scale_pattern,
      },
      {
        id: 'locrian_becarre_thirteenth',
        label: 'Locrien ♮13',
        intervals: rotateArray(harmonic_minor_scale_pattern, -1),
      },
      {
        id: 'ionian_sharp_fifth',
        label: 'Ionien ♯5',
        intervals: rotateArray(harmonic_minor_scale_pattern, -2),
      },
      {
        id: 'dorian_sharp_eleventh',
        label: 'Dorien ♯11',
        intervals: rotateArray(harmonic_minor_scale_pattern, -3),
      },
      {
        id: 'mixolydian_flat_nineth_flat_thirteenth',
        label: 'Mixolydien ♭9♭13',
        intervals: rotateArray(harmonic_minor_scale_pattern, -4),
      },
      {
        id: 'lydian_sharp_nineth',
        label: 'Lydien ♯9',
        intervals: rotateArray(harmonic_minor_scale_pattern, -5),
      },
      {
        id: 'altered_flat_flat_seventh',
        label: 'Altéré ♭♭7',
        intervals: rotateArray(harmonic_minor_scale_pattern, -6),
      },
    ],
  },
};

// SCALES GENERATION ⚡️

const alterateLeadingTone = (scale, alteration) => {
  return scale
    .slice(0, -1)
    .concat(notes[`${scale[scale.length - 1].id}_${alteration}`]);
};

const nextFifth = scale => {
  const nextFifthScale = rotateArray(scale, -4);
  return alterateLeadingTone(nextFifthScale, 'sharp');
};

const previousFifth = scale => {
  const alteredPreviousScale = alterateLeadingTone(scale, 'flat');
  return rotateArray(alteredPreviousScale, 4);
};

const getModeFromNotes = notes => {
  const scalePattern = getSuccessiveIntervalsFromNotes(notes, true);
  const modesList = flatMap(scales_pattern, scale => scale.modes);

  return modesList.find(mode =>
    scalePattern.every(
      (interval, index) => interval.id === mode.intervals[index].id,
    ),
  );
};

const transformScale = (scale, transform) => {
  const newScaleNotes = transform(scale.notes);
  const newScaleMode = getModeFromNotes(newScaleNotes);

  return {
    id: `${newScaleNotes[0].id}_${newScaleMode.id}_scale`,
    label: `${newScaleNotes[0].label} ${newScaleMode.label}`,
    notes: newScaleNotes,
    mode: newScaleMode,
  };
};

const createScaleFromNoteAndMode = (note, mode) => {
  const scaleNotes = [note];

  for (let [index, interval] of take(mode.intervals, 6).entries()) {
    const nextNote = findNoteByInterval(scaleNotes[index], interval);
    scaleNotes.push(nextNote);
  }

  return {
    id: `${note.id}_${mode.id}_scale`,
    label: `${note.label} ${mode.label}`,
    notes: scaleNotes,
    mode,
  };
};

const generateScales = (initialScale, transformFunction, iterations) => {
  let currentScale = initialScale;
  const scales = {
    [initialScale.notes[0].id]: initialScale,
  };

  for (let i = 0; i < iterations; i++) {
    currentScale = transformScale(currentScale, transformFunction);
    scales[currentScale.notes[0].id] = currentScale;
  }

  return scales;
};

const generateNaturalMinorScales = majorScales => {
  return Object.keys(majorScales).reduce((acc, scaleKey) => {
    const majorScale = majorScales[scaleKey];
    const minorScale = transformScale(majorScale, scale =>
      rotateArray(scale, -5),
    );
    acc[minorScale.notes[0].id] = minorScale;
    return acc;
  }, {});
};

const generateHarmonicMinorScales = naturalMinorScales => {
  return Object.keys(naturalMinorScales).reduce((acc, scaleKey) => {
    const naturalMinorScale = naturalMinorScales[scaleKey];
    const harmonicMinorScale = createScaleFromNoteAndMode(
      naturalMinorScale.notes[0],
      scales_pattern.harmonic_minor.modes[0],
    );
    acc[harmonicMinorScale.notes[0].id] = harmonicMinorScale;
    return acc;
  }, {});
};

// SCALES 🪜

const C_major_scale = createScaleFromNoteAndMode(
  naturalNotes.C,
  scales_pattern.major.modes[0],
);
const majorScales = {
  C: C_major_scale,
  ...generateScales(C_major_scale, nextFifth, 7),
  ...generateScales(C_major_scale, previousFifth, 7),
};

const naturalMinorScales = generateNaturalMinorScales(majorScales);
const harmonicMinorScales = generateHarmonicMinorScales(naturalMinorScales);

export const scales = {
  major: majorScales,
  natural_minor: naturalMinorScales,
  harmonic_minor: harmonicMinorScales,
};

export const getRandomScale = (mode, exceptions = []) => {
  const targetMode = mode ? mode : getRandomItem(Object.keys(scales));
  const randomScale = getRandomItem(
    Object.values(scales[targetMode]).filter(
      scale => !exceptions.includes(scale.id),
    ),
  );
  return randomScale;
};
