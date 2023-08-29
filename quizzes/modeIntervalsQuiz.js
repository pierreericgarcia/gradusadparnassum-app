import { diatonicModes } from '../music-theory/intervals.js';
import ChromaticIntervalsQuestion from '../questions/ChromaticIntervalsQuestion.js';
import { getRandomItem } from '../utils.js';

export const modeIntervalsQuiz = () => {
  const randomMode = getRandomItem(Object.values(diatonicModes));

  const checkAnswer = intervals => {
    return intervals.every(
      ({ id }, index) => randomMode.intervals[index].length.chromatic === id,
    );
  };

  return {
    title: `Intervalles chromatiques du mode ${randomMode.label} ?`,
    questions: [
      ChromaticIntervalsQuestion,
      ChromaticIntervalsQuestion,
      ChromaticIntervalsQuestion,
      ChromaticIntervalsQuestion,
      ChromaticIntervalsQuestion,
      ChromaticIntervalsQuestion,
      ChromaticIntervalsQuestion,
    ],
    checkAnswer,
  };
};
