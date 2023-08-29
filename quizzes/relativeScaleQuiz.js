import { getRandomScale, getRelativeScale } from '../music-theory/scales.js';
import AlterationQuestion from '../questions/AlterationQuestion.js';
import ModeQuestion from '../questions/ModeQuestion.js';
import NoteQuestion from '../questions/NoteQuestion.js';

export const relativeScaleQuiz = () => {
  const randomScale = getRandomScale();
  const relativeRandomScale = getRelativeScale(randomScale);

  const checkAnswer = ([note, alteration, mode]) => {
    const answerScaleId = alteration.id
      ? `${note.id}_${alteration.id}_${mode.id}_scale`
      : `${note.id}_${mode.id}_scale`;
    return answerScaleId === relativeRandomScale.id;
  };

  return {
    title: `Gamme relative de ${randomScale.label} ?`,
    questions: [NoteQuestion, AlterationQuestion, ModeQuestion],
    checkAnswer,
  };
};
