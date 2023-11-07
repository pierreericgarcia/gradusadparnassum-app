import { getRandomScale } from '../music-theory/scales';
import NoteQuestion from '../questions/NoteQuestion';
import { createIncrementalArray } from '../utils';

export const scaleNaturalNotesQuiz = () => {
  const randomScale = getRandomScale(
    ['major'],
    ['C_flat_major_scale', 'C_sharp_major_scale'],
  );
  const naturalNotes = randomScale.notes.filter(note => !note.alteration);

  const checkAnswer = answers => {
    return createIncrementalArray(naturalNotes.length).every(index => {
      const { id: noteId } = answers[index];

      return randomScale.notes.some(({ id }) => id === noteId);
    });
  };

  return {
    title: `Notes naturelles en ${randomScale.label} ?`,
    questions: naturalNotes.map(() => NoteQuestion),
    checkAnswer,
  };
};
