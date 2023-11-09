import { findNoteByInterval, intervals } from '../music-theory/intervals.js';
import { areNotesEqual, naturalNotes, notes } from '../music-theory/notes.js';
import AlterationQuestion from '../questions/AlterationQuestion';
import NoteQuestion from '../questions/NoteQuestion';
import { getRandomItem } from '../utils.js';
import chalk from 'chalk';

export const intervalFromNoteQuiz = () => {
  const randomNote = getRandomItem(Object.values(naturalNotes));
  const randomInterval = getRandomItem(Object.values(intervals));

  const checkAnswer = ([note, alteration]) => {
    const answeredNote = notes[`${note.id}_${alteration.id}`];
    const targetNote = findNoteByInterval(randomNote, randomInterval);
    return areNotesEqual(answeredNote, targetNote);
  };

  return {
    title: `${chalk.yellow(randomInterval.label)} de ${chalk.yellow(
      randomNote.label,
    )} ?`,
    questions: [NoteQuestion, AlterationQuestion],
    checkAnswer,
  };
};
