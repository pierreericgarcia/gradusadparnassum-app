import { createNaturalDegreeChord } from '../music-theory/chords.js';
import { diatonicModes } from '../music-theory/intervals.js';
import { scales } from '../music-theory/scales.js';
import ThreeNotesChordQuestion from '../questions/ThreeNotesChordQuestion.js';
import { getRandomItem } from '../utils.js';

export const degreeThreeNotesChordQualityQuiz = () => {
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
    title: `Qualité de l'accord à 3 sons de ${randomDegree.label} en ${randomMode.label} ?`,
    questions: [ThreeNotesChordQuestion],
    checkAnswer,
  };
};
