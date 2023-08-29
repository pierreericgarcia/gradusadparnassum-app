import { intervals } from '../music-theory/intervals.js';
import IntervalLengthQuestion from '../questions/IntervalLengthQuestion.js';
import { getRandomItem } from '../utils.js';

export const intervalLengthQuiz = () => {
  const randomInterval = getRandomItem(
    Object.values(intervals).filter(({ length }) => length.chromatic > 0),
  );

  const checkAnswer = ([intervalLength]) => {
    return intervalLength.id === randomInterval.length.chromatic;
  };

  return {
    title: `Nombre de demi-tons de l'intervalle ${randomInterval.label} ?`,
    questions: [IntervalLengthQuestion],
    checkAnswer,
  };
};
