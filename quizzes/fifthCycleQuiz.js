import { notes } from '../music-theory/notes';
import { getRandomScale } from '../music-theory/scales';
import NoteQuestion from '../questions/NoteQuestion';
import { getRandomItem } from '../utils';
import AlterationQuestion from '../questions/AlterationQuestion';

export const fifthCycleQuiz = () => {
  const randomScale = getRandomScale('major');
  const randomDirection = getRandomItem([
    {
      value: 'asc',
      label: 'ascendante',
    },
    {
      value: 'desc',
      label: 'descendante',
    },
  ]);

  const checkAnswer = ([note, alteration]) => {
    const answeredNote = notes[`${note.id}_${alteration.id}`];
    const targetNote =
      randomScale.notes[randomDirection.value === 'asc' ? 4 : 3];
    return (
      answeredNote.index.diatonic === targetNote.index.diatonic &&
      answeredNote.index.chromatic === targetNote.index.chromatic
    );
  };

  return {
    title: `Quinte ${randomDirection.label} de ${randomScale.notes[0].label} ?`,
    questions: [NoteQuestion, AlterationQuestion],
    checkAnswer,
  };
};
