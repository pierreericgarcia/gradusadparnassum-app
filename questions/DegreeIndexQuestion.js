import React from 'react';
import { View } from 'react-native';
import { AnswerButton } from '../components/AnswerButton';
import { Text } from '../components/Text';
import { spacing } from '../theme';
import { createIncrementalArray, toRoman } from '../utils';

export default function DegreeIndexQuestion({ onPress }) {
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
      {createIncrementalArray(7).map(index => (
        <AnswerButton
          style={{ flexBasis: '48%', height: '23%' }}
          onPress={() => onPress({ id: index, label: toRoman(index + 1) })}
          key={index}
        >
          <Text weight="semiBold" color="white">
            {toRoman(index + 1)}
          </Text>
        </AnswerButton>
      ))}
    </View>
  );
}
