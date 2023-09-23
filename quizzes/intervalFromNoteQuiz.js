import { findNoteByInterval, intervals } from '../music-theory/intervals.js';
import { notes } from '../music-theory/notes.js';
import AlterationQuestion from '../questions/AlterationQuestion';
import NoteQuestion from '../questions/NoteQuestion';
import { getRandomItem } from '../utils.js';
import chalk from 'chalk';

export const intervalFromNoteQuiz = () => {
  const randomNote = getRandomItem(
    Object.values(notes).filter(
      ({ alteration }) =>
        !alteration || ['sharp', 'flat'].includes(alteration.id),
    ),
  );
  const randomInterval = getRandomItem(Object.values(intervals));

  const checkAnswer = ([note, alteration]) => {
    const answeredNote = notes[`${note.id}_${alteration.id}`];
    const targetNote = findNoteByInterval(randomNote, randomInterval);
    return (
      answeredNote.index.diatonic === targetNote.index.diatonic &&
      answeredNote.index.chromatic === targetNote.index.chromatic
    );
  };

  return {
    title: `${chalk.yellow(randomInterval.label)} de ${chalk.yellow(
      randomNote.label,
    )} ?`,
    questions: [NoteQuestion, AlterationQuestion],
    checkAnswer,
  };
};
