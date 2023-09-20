import { notes } from '../music-theory/notes';
import NoteQuestion from '../questions/NoteQuestion';

const flatOrder = [
  notes.B,
  notes.E,
  notes.A,
  notes.D,
  notes.G,
  notes.C,
  notes.F,
];

export const flatOrderQuiz = () => {
  const checkAnswer = answers => {
    return flatOrder.every((note, index) => {
      return note.id === answers[index].id;
    });
  };

  return {
    title: 'Ordre des bémols ?',
    questions: flatOrder.map(() => NoteQuestion),
    checkAnswer,
  };
};
