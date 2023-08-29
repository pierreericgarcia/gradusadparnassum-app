import React from 'react';
import { View } from 'react-native';
import { AnswerButton } from '../components/AnswerButton';
import { Text } from '../components/Text';
import { spacing } from '../theme';
import { chords } from '../music-theory/chords';

export default function ThreeNotesChordQuestion({ onPress }) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
        justifyContent: 'space-between',
      }}
    >
      {Object.values(chords)
        .filter(({ intervals }) => intervals.length === 3)
        .map(chord => (
          <AnswerButton
            style={{ flexBasis: '48%', height: '48%' }}
            onPress={() => onPress({ id: chord.id, label: chord.label })}
            key={chord.id}
          >
            <Text weight="semiBold" color="white">
              {chord.label}
            </Text>
          </AnswerButton>
        ))}
    </View>
  );
}
