import { notes } from '../music-theory/notes';
import { getRandomScale } from '../music-theory/scales';
import AlterationQuestion from '../questions/AlterationQuestion';
import NoteQuestion from '../questions/NoteQuestion';
import { getRandomIndex, toRoman } from '../utils';

export const degreeQuiz = () => {
  const randomScale = getRandomScale('major');
  const randomDegreeIndex = getRandomIndex(randomScale.notes);

  const checkAnswer = ([note, alteration]) => {
    const answeredNote = notes[`${note.id}_${alteration.id}`];
    const randomDegree = randomScale.notes[randomDegreeIndex];
    return (
      answeredNote.index.diatonic === randomDegree.index.diatonic &&
      answeredNote.index.chromatic === randomDegree.index.chromatic
    );
  };

  return {
    title: `Degré ${toRoman(randomDegreeIndex + 1)} de ${randomScale.label} ?`,
    questions: [NoteQuestion, AlterationQuestion],
    checkAnswer,
  };
};
