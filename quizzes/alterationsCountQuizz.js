import { alterations, getAlterationsCount } from '../music-theory/notes.js';
import { getRandomScale } from '../music-theory/scales.js';
import AlterationsCountQuestion from '../questions/AlterationsCountQuestion.js';
import { getRandomItem } from '../utils.js';

export const alterationsCountQuizz = () => {
  const randomScale = getRandomScale();
  const randomAlteration = getRandomItem(Object.values(alterations));

  const checkAnswer = ([alterationCount]) => {
    const randomScaleAlterationsCount = getAlterationsCount(
      randomScale.notes,
      randomAlteration.id,
    );
    return alterationCount.id === randomScaleAlterationsCount;
  };

  return {
    title: `Combien de ${randomAlteration.label.toLowerCase()} en ${
      randomScale.label
    } ?`,
    questions: [AlterationsCountQuestion],
    checkAnswer,
  };
};
