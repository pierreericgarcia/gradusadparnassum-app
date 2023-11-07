import { areNotesEqual, notes } from '../music-theory/notes';
import { getRandomScale } from '../music-theory/scales';
import NoteQuestion from '../questions/NoteQuestion';
import { getRandomIndex, toRoman } from '../utils';
import AlterationQuestion from '../questions/AlterationQuestion';

export const degreeQuiz = () => {
  const randomScale = getRandomScale(['major']);
  const randomDegreeIndex = getRandomIndex(randomScale.notes);

  const checkAnswer = ([note, alteration]) => {
    const answeredNote = notes[`${note.id}_${alteration.id}`];
    const randomDegree = randomScale.notes[randomDegreeIndex];
    return areNotesEqual(answeredNote, randomDegree);
  };

  return {
    title: `Degré ${toRoman(randomDegreeIndex + 1)} de ${randomScale.label} ?`,
    questions: [NoteQuestion, AlterationQuestion],
    checkAnswer,
  };
};
