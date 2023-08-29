import { diatonicModes } from '../music-theory/intervals.js';
import { getRandomScale } from '../music-theory/scales.js';
import AlterationQuestion from '../questions/AlterationQuestion.js';
import NoteQuestion from '../questions/NoteQuestion.js';
import { getRandomItem } from '../utils.js';

export const degreeFundamentalQuiz = () => {
  const randomScale = getRandomScale();
  const randomDegree = getRandomItem(
    diatonicModes[randomScale.mode.id].degrees,
  );

  const checkAnswer = ([note, alteration]) => {
    const degreeId = alteration.id ? `${note.id}_${alteration.id}` : note.id;
    return degreeId === randomScale.notes[randomDegree.index].id;
  };

  return {
    title: `Fondamentale de la ${randomDegree.label} de ${randomScale.label} ?`,
    questions: [NoteQuestion, AlterationQuestion],
    checkAnswer,
  };
};
