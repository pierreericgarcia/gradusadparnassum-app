import { View, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Text } from '../components/Text';
import { useGame } from '../contexts/GameContext';
import { colors, spacing } from '../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnswerBadge } from '../components/AnswerBadge';
import { GameHeader } from '../components/GameHeader';
import { createIncrementalArray } from '../utils';
import { Ionicons } from '@expo/vector-icons';

export default function GameScreen() {
  const { bottom, left, right } = useSafeAreaInsets();
  const {
    currentQuizTitle,
    currentQuizAnswers,
    questionsLength,
    getAnswerComponent,
    success,
    fail,
    goToPreviousQuestion,
  } = useGame();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: currentQuizAnswers.length > 0 && !fail && !success ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [currentQuizAnswers, fail, success]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.5, backgroundColor: colors.white }}>
        <GameHeader />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flex: 1,
            paddingHorizontal: spacing.lg,
          }}
        >
          <Text secondary size="xlplus" style={{ textAlign: 'center' }}>
            {currentQuizTitle}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              gap: spacing.xxs,
              width: '100%',
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Animated.View
              style={{ opacity: fadeAnim, position: 'absolute', left: 0 }}
            >
              <Ionicons
                disabled={currentQuizAnswers.length === 0 || fail || success}
                onPress={() => goToPreviousQuestion()}
                name="arrow-back-outline"
                size={30}
                color="black"
              />
            </Animated.View>
            {createIncrementalArray(questionsLength).map(questionIndex => (
              <View key={questionIndex}>
                {currentQuizAnswers[questionIndex] ? (
                  <AnswerBadge success={success} fail={fail}>
                    <Text size="xs" weight="bold" color="white">
                      {currentQuizAnswers[questionIndex].label}
                    </Text>
                  </AnswerBadge>
                ) : (
                  <Text style={{ height: 25 }}>____</Text>
                )}
              </View>
            ))}
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 0.5,
          padding: spacing.sm,
          backgroundColor: colors.black,
          paddingLeft: left + spacing.md,
          paddingRight: right + spacing.md,
          paddingBottom: bottom + spacing.md,
        }}
      >
        {getAnswerComponent()}
      </View>
    </View>
  );
}
