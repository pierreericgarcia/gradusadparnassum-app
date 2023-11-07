import { getRandomScale, scales } from '../music-theory/scales.js';
import chalk from 'chalk';
import NoteQuestion from '../questions/NoteQuestion.js';
import ModeQuestion from '../questions/ModeQuestion.js';
import ShortAlterationQuestion from '../questions/ShortAlterationQuestion.js';

export const relativeScaleQuiz = () => {
  const randomScale = getRandomScale();

  const getRelativeScale = scale => {
    switch (scale.mode.id) {
      case 'major':
        return scales['minor'][scale.notes[5].id];
      case 'minor':
        return scales['major'][scale.notes[2].id];

      default:
        throw Error('Scale is not major or minor');
    }
  };

  const getAnsweredScale = ({ alteration, note, mode }) => {
    const answeredNoteId =
      alteration.id === 'becarre' ? note.id : `${note.id}_${alteration.id}`;

    return scales[mode.id][answeredNoteId];
  };

  const checkAnswer = ([note, alteration, mode]) => {
    const relativeScale = getRelativeScale(randomScale);
    const answeredScale = getAnsweredScale({ note, alteration, mode });
    return answeredScale?.id === relativeScale.id;
  };

  return {
    title: `Tonalité relative de ${chalk.yellow(randomScale.label)} ?`,
    questions: [NoteQuestion, ShortAlterationQuestion, ModeQuestion],
    checkAnswer,
  };
};
