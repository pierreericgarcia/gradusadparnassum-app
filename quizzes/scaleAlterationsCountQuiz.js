import { alterations } from '../music-theory/notes';
import { getRandomScale } from '../music-theory/scales';
import AlterationsCountQuestion from '../questions/AlterationsCountQuestion';
import { getRandomItem } from '../utils';

export const scaleAlterationsCountQuiz = () => {
  const randomScale = getRandomScale();
  const randomAlteration = getRandomItem([alterations.sharp, alterations.flat]);

  const countAlterations = notes => {
    return notes.filter(note => note.alteration?.id === randomAlteration.id)
      .length;
  };

  const checkAnswer = ([{ id: count }]) => {
    return Number(count) === countAlterations(randomScale.notes);
  };

  return {
    title: `Combien de ${randomAlteration.label} en ${randomScale.label} ?`,
    questions: [AlterationsCountQuestion],
    checkAnswer,
  };
};
