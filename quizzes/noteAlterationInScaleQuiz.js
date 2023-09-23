import { Note, alterations } from '../music-theory/notes.js';
import { getRandomScale } from '../music-theory/scales.js';
import ShortAlterationQuestion from '../questions/ShortAlterationQuestion';
import { getRandomItem } from '../utils.js';
import chalk from 'chalk';

export const noteAlterationInScaleQuiz = () => {
  const randomScale = getRandomScale('major');
  const randomNoteInScale = getRandomItem(randomScale.notes);

  const checkAnswer = ([alteration]) => {
    const answeredNote = new Note(
      randomNoteInScale.base,
      alterations[alteration.id],
    );
    return (
      answeredNote.index.diatonic === randomNoteInScale.index.diatonic &&
      answeredNote.index.chromatic === randomNoteInScale.index.chromatic
    );
  };

  return {
    title: `Altération du ${chalk.yellow(
      randomNoteInScale.base.label,
    )} en ${chalk.yellow(randomScale.label)} ?`,
    questions: [ShortAlterationQuestion],
    checkAnswer,
  };
};
