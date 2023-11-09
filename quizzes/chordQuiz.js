import {
  Note,
  alterations,
  areNotesEqual,
  naturalNotes,
  notes,
} from '../music-theory/notes';
import NoteQuestion from '../questions/NoteQuestion';
import { createIncrementalArray, getRandomIndex } from '../utils';
import { createNaturalDegreeChord } from '../music-theory/chords';
import { getRandomScale } from '../music-theory/scales';
import ShortAlterationQuestion from '../questions/ShortAlterationQuestion';
import _ from 'lodash';
const { flatten } = _;

export const chordQuiz = () => {
  const randomScale = getRandomScale();
  const randomDegree = getRandomIndex(createIncrementalArray(7));
  const randomTonalChord = createNaturalDegreeChord(
    randomDegree,
    randomScale.notes,
  );

  const checkAnswer = answers => {
    let userNotes = [];

    for (let i = 0; i < answers.length; i += 2) {
      const note = answers[i];
      const alteration = answers[i + 1];
      const userNote = new Note(
        naturalNotes[note.id],
        alterations[alteration.id],
      );
      userNotes.push(userNote);
    }

    return userNotes.every((note, index) =>
      areNotesEqual(notes[note.id], randomTonalChord.notes[index]),
    );
  };

  return {
    title: `Accord de ${randomTonalChord.label} ?`,
    questions: flatten(
      randomTonalChord.notes.map(() => [NoteQuestion, ShortAlterationQuestion]),
    ),
    checkAnswer,
  };
};
