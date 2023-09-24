import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getRandomItem } from '../utils';
import { degreeQuiz } from '../quizzes/degreeQuiz';
import { fifthCycleQuiz } from '../quizzes/fifthCycleQuiz';
import { flatOrderQuiz } from '../quizzes/flatOrderQuiz';
import { scaleAlterationsCountQuiz } from '../quizzes/scaleAlterationsCountQuiz';
import { scaleAlteredNotesQuiz } from '../quizzes/scaleAlteredNotesQuiz';
import { scaleNaturalNotesQuiz } from '../quizzes/scaleNaturalNotesQuiz';
import { sharpOrderQuiz } from '../quizzes/sharpOrderQuiz';
import { diatonicIntervalFromNoteQuiz } from '../quizzes/diatonicIntervalFromNoteQuiz';
import { noteAlterationInScaleQuiz } from '../quizzes/noteAlterationInScaleQuiz';
import { chordQuiz } from '../quizzes/chordQuiz';
import { intervalFromNoteQuiz } from '../quizzes/intervalFromNoteQuiz';

export const GAME_DURATION = 120;
const GameContext = createContext();

const quizzes = [
  chordQuiz,
  degreeQuiz,
  fifthCycleQuiz,
  flatOrderQuiz,
  diatonicIntervalFromNoteQuiz,
  intervalFromNoteQuiz,
  noteAlterationInScaleQuiz,
  scaleAlterationsCountQuiz,
  scaleAlteredNotesQuiz,
  scaleNaturalNotesQuiz,
  sharpOrderQuiz,
];

export const useGame = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }) => {
  const navigation = useNavigation();
  const [gameStats, setGameStats] = useState({
    score: 0,
    currentStreak: 0,
    bestStreak: 0,
    errors: 0,
  });
  const [currentQuiz, setCurrentQuiz] = useState(getRandomItem(quizzes));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [currentQuizAnswers, setCurrentQuizAnswers] = useState([]);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      navigation.navigate('Scores', {
        gameStats,
      });
    }

    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (currentQuizAnswers.length === currentQuiz.questions.length) {
      const correct = currentQuiz.checkAnswer(currentQuizAnswers);
      updateGameStats(correct);
      if (correct) {
        setSuccess(true);
      } else {
        setFail(true);
      }
    }
  }, [currentQuizAnswers]);

  useEffect(() => {
    if (success || fail) {
      const timer = setTimeout(() => {
        setCurrentQuestionIndex(0);
        if (success) {
          setCurrentQuiz(getRandomItem(quizzes));
        }
        setCurrentQuizAnswers([]);

        setSuccess(false);
        setFail(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [success, fail]);

  const onChange = answer => {
    if (
      currentQuizAnswers.concat(answer).length < currentQuiz.questions.length
    ) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
    setCurrentQuizAnswers(prevAnswers => [...prevAnswers, answer]);
  };

  const updateGameStats = correct => {
    if (correct) {
      setGameStats(prevGame => ({
        ...prevGame,
        currentStreak: prevGame.currentStreak + 1,
        score: prevGame.score + 1,
        bestStreak:
          prevGame.currentStreak + 1 > prevGame.bestStreak
            ? prevGame.currentStreak + 1
            : prevGame.bestStreak,
      }));
    } else {
      setGameStats(prevGame => ({
        ...prevGame,
        currentStreak: 0,
        errors: prevGame.errors + 1,
      }));
    }
  };

  const goToPreviousQuestion = () => {
    setCurrentQuestionIndex(prev => prev - 1);
    setCurrentQuizAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      newAnswers.pop();
      return newAnswers;
    });
  };

  const getAnswerComponent = () => {
    const question = currentQuiz.questions[currentQuestionIndex];
    return question({ onPress: onChange });
  };

  return (
    <GameContext.Provider
      value={{
        gameStats,
        timeLeft,
        currentQuizTitle: currentQuiz.title,
        getAnswerComponent,
        currentQuizAnswers,
        questionsLength: currentQuiz.questions.length,
        onChange,
        success,
        fail,
        goToPreviousQuestion,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
