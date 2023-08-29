import React from 'react';
import { View } from 'react-native';
import { AnswerButton } from '../components/AnswerButton';
import { Text } from '../components/Text';
import { spacing } from '../theme';
import { degrees } from '../music-theory/intervals';
import { capitalize } from '../utils';

export default function DegreeNameQuestion({ onPress }) {
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
      {Object.values(degrees).map(degree => (
        <AnswerButton
          style={{ flexBasis: '48%', height: '23%' }}
          onPress={() =>
            onPress({ id: degree.id, label: capitalize(degree.label) })
          }
          key={degree.id}
        >
          <Text weight="semiBold" color="white">
            {capitalize(degree.label)}
          </Text>
        </AnswerButton>
      ))}
    </View>
  );
}
