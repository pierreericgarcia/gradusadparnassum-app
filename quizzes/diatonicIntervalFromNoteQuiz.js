import { findNoteByInterval, intervals } from '../music-theory/intervals.js';
import { areNotesEqual, naturalNotes, notes } from '../music-theory/notes.js';
import NoteQuestion from '../questions/NoteQuestion.js';
import { getRandomItem } from '../utils.js';
import chalk from 'chalk';

export const diatonicIntervalFromNoteQuiz = () => {
  const randomNote = getRandomItem(Object.values(naturalNotes));
  const randomInterval = getRandomItem(
    Object.values(intervals).filter(
      ({ id }) => !id.includes('unison') && !id.includes('octave'),
    ),
  );
  const randomIntervalLabel = randomInterval.label.split(' ')[0];

  const checkAnswer = ([note]) => {
    const answeredNote = notes[note.id];
    const targetNote = findNoteByInterval(
      randomNote,
      randomInterval,
      false,
      true,
    );
    return areNotesEqual(answeredNote, targetNote);
  };

  return {
    title: `${chalk.yellow(randomIntervalLabel)} de ${chalk.yellow(
      randomNote.label,
    )} ?`,
    questions: [NoteQuestion],
    checkAnswer,
  };
};
