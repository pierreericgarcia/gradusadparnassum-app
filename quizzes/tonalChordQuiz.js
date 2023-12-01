import {
  Note,
  alterations,
  areNotesEqual,
  naturalNotes,
  notes,
} from '../music-theory/notes';
import NoteQuestion from '../questions/NoteQuestion';
import { getRandomItem } from '../utils';
import { createNaturalDegreeChord } from '../music-theory/chords';
import { getRandomScale } from '../music-theory/scales';
import _ from 'lodash';
import AlterationQuestion from '../questions/AlterationQuestion';
const { flatten } = _;

export const tonalChordQuiz = () => {
  const randomScale = getRandomScale(['major', 'minor']);
  const randomDegree = getRandomItem([
    { index: 3, label: 'Sous-Dominante', length: 3 },
    { index: 4, label: 'Dominante', length: 3 },
    { index: 4, label: 'Septième de Dominante', length: 4 },
  ]);
  const randomTonalChord = createNaturalDegreeChord(
    randomDegree.index,
    randomScale.notes,
    randomDegree.length,
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
    title: `Accord de ${randomDegree.label} de ${randomScale.label} ?`,
    questions: flatten(
      randomTonalChord.notes.map(() => [NoteQuestion, AlterationQuestion]),
    ),
    checkAnswer,
  };
};
