import { Note, alterations, areNotesEqual } from '../music-theory/notes.js';
import { getRandomScale } from '../music-theory/scales.js';
import AlterationQuestion from '../questions/AlterationQuestion.js';
import { getRandomItem } from '../utils.js';
import chalk from 'chalk';

export const noteAlterationInScaleQuiz = () => {
  const randomScale = getRandomScale(['major']);
  const randomNoteInScale = getRandomItem(randomScale.notes);

  const checkAnswer = ([alteration]) => {
    const answeredNote = new Note(
      randomNoteInScale.base,
      alterations[alteration.id],
    );
    return areNotesEqual(answeredNote, randomNoteInScale);
  };

  return {
    title: `Altération du ${chalk.yellow(
      randomNoteInScale.base.label,
    )} en ${chalk.yellow(randomScale.label)} ?`,
    questions: [AlterationQuestion],
    checkAnswer,
  };
};
