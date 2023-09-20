import { getRandomScale } from '../music-theory/scales';
import AlterationQuestion from '../questions/AlterationQuestion';

export const scaleAlterationTypeQuiz = () => {
  const randomScale = getRandomScale('major');

  const getAlterationType = notes => {
    const alteredNote = notes.find(note => !!note.alteration);
    return alteredNote.alteration;
  };

  const checkAnswer = ([alteration]) => {
    const alterationType = getAlterationType(randomScale.notes);
    if (alteration.id === 'becarre') {
      return alterationType === null;
    }
    return alteration.id === alterationType.id;
  };

  return {
    title: `Quel type d'altération en ${randomScale.label} ?`,
    questions: [AlterationQuestion],
    checkAnswer,
  };
};
