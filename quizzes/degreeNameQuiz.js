import { diatonicModes } from '../music-theory/intervals.js';
import DegreeNameQuestion from '../questions/DegreeNameQuestion.js';
import { getRandomItem, toRoman } from '../utils.js';

export const degreeNameQuiz = () => {
  const randomMode = getRandomItem(Object.values(diatonicModes));
  const randomDegree = getRandomItem(randomMode.degrees);

  const checkAnswer = ([degree]) => {
    return degree.id === randomDegree.id;
  };

  return {
    title: `Nom du degré ${toRoman(randomDegree.index + 1)} en ${
      randomMode.label
    } ?`,
    questions: [DegreeNameQuestion],
    checkAnswer,
  };
};
