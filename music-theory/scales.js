import { getRandomItem, rotateArray } from '../utils.js';
import { diatonicModes, getModeFromNotes } from './intervals.js';
import { notes } from './notes.js';

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

const generateNewScale = (scale, transform) => {
  const newScaleNotes = transform(scale.notes);
  const newScaleMode = getModeFromNotes(newScaleNotes);
  return {
    id: `${newScaleNotes[0].id}_${newScaleMode.id}_scale`,
    label: `${newScaleNotes[0].label} ${newScaleMode.label}`,
    notes: newScaleNotes,
    mode: newScaleMode,
  };
};

const C_major_scale = {
  id: 'C_major_scale',
  label: 'Do Majeur',
  mode: diatonicModes.major,
  notes: [notes.C, notes.D, notes.E, notes.F, notes.G, notes.A, notes.B],
};

// MAJOR SHARP SCALES

const G_major_scale = generateNewScale(C_major_scale, nextFifth);
const D_major_scale = generateNewScale(G_major_scale, nextFifth);
const A_major_scale = generateNewScale(D_major_scale, nextFifth);
const E_major_scale = generateNewScale(A_major_scale, nextFifth);
const B_major_scale = generateNewScale(E_major_scale, nextFifth);
const F_sharp_major_scale = generateNewScale(B_major_scale, nextFifth);
const C_sharp_major_scale = generateNewScale(F_sharp_major_scale, nextFifth);

// // MAJOR FLAT SCALES

const F_major_scale = generateNewScale(C_major_scale, previousFifth);
const B_flat_major_scale = generateNewScale(F_major_scale, previousFifth);
const E_flat_major_scale = generateNewScale(B_flat_major_scale, previousFifth);
const A_flat_major_scale = generateNewScale(E_flat_major_scale, previousFifth);
const D_flat_major_scale = generateNewScale(A_flat_major_scale, previousFifth);
const G_flat_major_scale = generateNewScale(D_flat_major_scale, previousFifth);
const C_flat_major_scale = generateNewScale(G_flat_major_scale, previousFifth);

export const scales = {
  major: {
    C: C_major_scale,
    G: G_major_scale,
    D: D_major_scale,
    A: A_major_scale,
    E: E_major_scale,
    B: B_major_scale,
    F_sharp: F_sharp_major_scale,
    C_sharp: C_sharp_major_scale,
    F: F_major_scale,
    B_flat: B_flat_major_scale,
    E_flat: E_flat_major_scale,
    A_flat: A_flat_major_scale,
    D_flat: D_flat_major_scale,
    G_flat: G_flat_major_scale,
    C_flat: C_flat_major_scale,
  },
  minor: {
    A: generateNewScale(C_major_scale, scale => rotateArray(scale, -5)),
    E: generateNewScale(G_major_scale, scale => rotateArray(scale, -5)),
    B: generateNewScale(D_major_scale, scale => rotateArray(scale, -5)),
    F_sharp: generateNewScale(A_major_scale, scale => rotateArray(scale, -5)),
    C_sharp: generateNewScale(E_major_scale, scale => rotateArray(scale, -5)),
    G_sharp: generateNewScale(B_major_scale, scale => rotateArray(scale, -5)),
    D_sharp: generateNewScale(F_sharp_major_scale, scale =>
      rotateArray(scale, -5),
    ),
    A_sharp: generateNewScale(C_sharp_major_scale, scale =>
      rotateArray(scale, -5),
    ),
    D: generateNewScale(F_major_scale, scale => rotateArray(scale, -5)),
    G: generateNewScale(B_flat_major_scale, scale => rotateArray(scale, -5)),
    C: generateNewScale(E_flat_major_scale, scale => rotateArray(scale, -5)),
    F: generateNewScale(A_flat_major_scale, scale => rotateArray(scale, -5)),
    B_flat: generateNewScale(D_flat_major_scale, scale =>
      rotateArray(scale, -5),
    ),
    E_flat: generateNewScale(G_flat_major_scale, scale =>
      rotateArray(scale, -5),
    ),
    A_flat: generateNewScale(C_flat_major_scale, scale =>
      rotateArray(scale, -5),
    ),
  },
};

export const getRelativeScale = startScale => {
  switch (startScale.mode.id) {
    case 'major':
      return generateNewScale(startScale, scale => rotateArray(scale, -5));

    case 'minor':
      return generateNewScale(startScale, scale => rotateArray(scale, -2));

    default:
      break;
  }
};

export const getRandomScale = () => {
  const randomMode = getRandomItem(Object.keys(scales));
  const randomScale = getRandomItem(Object.values(scales[randomMode]));
  return randomScale;
};
