import { getRandomScale } from '../music-theory/scales.js';
import DegreeIndexQuestion from '../questions/DegreeIndexQuestion.js';
import { getRandomIndex } from '../utils.js';

export const degreeIndexQuiz = () => {
  const randomScale = getRandomScale();
  const randomDegreeIndex = getRandomIndex(randomScale.notes);

  const checkAnswer = ([degreeIndex]) => {
    return degreeIndex.id === randomDegreeIndex;
  };

  return {
    title: `Numéro du degré ayant pour fondamentale ${randomScale.notes[randomDegreeIndex].label} en ${randomScale.label} ?`,
    questions: [DegreeIndexQuestion],
    checkAnswer,
  };
};
