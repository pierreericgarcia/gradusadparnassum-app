import { notes } from '../music-theory/notes';
import NoteQuestion from '../questions/NoteQuestion';

const sharpOrder = [
  notes.F,
  notes.C,
  notes.G,
  notes.D,
  notes.A,
  notes.E,
  notes.B,
];

export const sharpOrderQuiz = () => {
  const checkAnswer = answers => {
    return sharpOrder.every((note, index) => {
      return note.id === answers[index].id;
    });
  };

  return {
    title: 'Ordre des dièses ?',
    questions: sharpOrder.map(() => NoteQuestion),
    checkAnswer,
  };
};
