import { createNaturalDegreeChord } from '../music-theory/chords.js';
import { diatonicModes } from '../music-theory/intervals.js';
import { scales } from '../music-theory/scales.js';
import ChordQuestion from '../questions/ChordQuestion.js';
import { getRandomItem } from '../utils.js';

export const degreeChordQualityQuiz = () => {
  const randomMode = getRandomItem(Object.values(diatonicModes));
  const randomDegree = getRandomItem(randomMode.degrees);

  const checkAnswer = ([chord]) => {
    const randomScale = getRandomItem(Object.values(scales[randomMode.id]));
    const naturalRandomDegreeChord = createNaturalDegreeChord(
      randomDegree.index,
      randomScale.notes,
    );
    return naturalRandomDegreeChord.quality.id === chord.id;
  };

  return {
    title: `Qualité de l'accord de ${randomDegree.label} en ${randomMode.label} ?`,
    questions: [ChordQuestion],
    checkAnswer,
  };
};
