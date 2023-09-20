import { getRandomScale } from '../music-theory/scales';
import AlterationsCountQuestion from '../questions/AlterationsCountQuestion';

export const scaleAlterationsCountQuiz = () => {
  const randomScale = getRandomScale('major');

  const countAlterations = notes => {
    return notes.filter(note => note.alteration).length;
  };

  const checkAnswer = ([{ id: count }]) => {
    return Number(count) === countAlterations(randomScale.notes);
  };

  return {
    title: `Nombre d'altérations en ${randomScale.label} ?`,
    questions: [AlterationsCountQuestion],
    checkAnswer,
  };
};
