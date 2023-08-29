import React from 'react';
import { View } from 'react-native';
import { AnswerButton } from '../components/AnswerButton';
import { Text } from '../components/Text';
import { spacing } from '../theme';
import { chords } from '../music-theory/chords';

export default function ChordQuestion({ onPress }) {
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
      {Object.values(chords).map(chord => (
        <AnswerButton
          style={{ flexBasis: '30%', height: '30%' }}
          onPress={() => onPress({ id: chord.id, label: chord.aliases[0] })}
          key={chord.id}
        >
          <Text weight="semiBold" color="white">
            {chord.aliases[0]}
          </Text>
        </AnswerButton>
      ))}
    </View>
  );
}
