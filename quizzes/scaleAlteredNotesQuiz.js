import { getRandomScale } from '../music-theory/scales';
import NoteQuestion from '../questions/NoteQuestion';
import { createIncrementalArray } from '../utils';

export const scaleAlteredNotesQuiz = () => {
  const randomScale = getRandomScale('major', ['C_major']);
  const alteredNotes = randomScale.notes.filter(note => !!note.alteration);

  const checkAnswer = answers => {
    return createIncrementalArray(alteredNotes.length).every(index => {
      const { id: noteId } = answers[index];

      return randomScale.notes.some(({ base }) => base.id === noteId);
    });
  };

  return {
    title: `Notes altérées en ${randomScale.label} ?`,
    questions: alteredNotes.map(() => NoteQuestion),
    checkAnswer,
  };
};
