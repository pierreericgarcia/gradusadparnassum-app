import { getRandomScale, scales } from '../music-theory/scales';
import AlternativeModeQuestion from '../questions/AlternativeModeQuestion';
import NoteQuestion from '../questions/NoteQuestion';
import ShortAlterationQuestion from '../questions/ShortAlterationQuestion';

export const tonalityFromAlterationsQuiz = () => {
  const randomScale = getRandomScale(['major', 'natural_minor']);

  const getAlterationsDetails = notes => {
    const alteredNotes = notes.filter(note => note.alteration);

    if (alteredNotes.length === 0) {
      return {
        count: 0,
        alteration: null,
      };
    }

    return {
      count: alteredNotes.length,
      alteration: alteredNotes[0].alteration,
    };
  };

  const getAnsweredScale = ({ alteration, note, mode }) => {
    const answeredNoteId =
      alteration.id === 'becarre' ? note.id : `${note.id}_${alteration.id}`;

    return scales[mode.id][answeredNoteId];
  };

  const randomScaleAlterationDetails = getAlterationsDetails(randomScale.notes);

  const getQuestionTitle = alterationDetails => {
    if (alterationDetails.count === 0) {
      return `Tonalité ${randomScale.mode.label}e sans aucune altération à la clef ?`;
    }

    return `Tonalité ${randomScale.mode.label}e avec ${randomScaleAlterationDetails.count}${randomScaleAlterationDetails.alteration.symbol} à la clef ?`;
  };

  const checkAnswer = ([note, alteration, mode]) => {
    const answeredScale = getAnsweredScale({ note, alteration, mode });
    return answeredScale?.id === randomScale.id;
  };

  return {
    title: getQuestionTitle(randomScaleAlterationDetails),
    questions: [NoteQuestion, ShortAlterationQuestion, AlternativeModeQuestion],
    checkAnswer,
  };
};
