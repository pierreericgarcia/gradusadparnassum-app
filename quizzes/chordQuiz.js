import { areNotesEqual, naturalNotes, notes } from '../music-theory/notes';
import NoteQuestion from '../questions/NoteQuestion';
import { getRandomItem } from '../utils';
import { findNoteByInterval, intervals } from '../music-theory/intervals';

export const chordQuiz = () => {
  const randomNote = getRandomItem(Object.values(naturalNotes));
  const secondNote = findNoteByInterval(
    randomNote,
    intervals.major_third,
    false,
    true,
  );
  const thirdNote = findNoteByInterval(
    randomNote,
    intervals.perfect_fifth,
    false,
    true,
  );
  const chord = [randomNote, secondNote, thirdNote];

  const checkAnswer = answeredNotes => {
    return answeredNotes.every((note, index) =>
      areNotesEqual(notes[note.id], chord[index]),
    );
  };

  return {
    title: `Accord à 3 sons de ${randomNote.label} ?`,
    questions: [NoteQuestion, NoteQuestion, NoteQuestion],
    checkAnswer,
  };
};
