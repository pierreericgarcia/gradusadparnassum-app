import React from 'react';
import { View } from 'react-native';
import { AnswerButton } from '../components/AnswerButton';
import { Text } from '../components/Text';
import { spacing } from '../theme';
import { createIncrementalArray } from '../utils';

export default function AlterationsCountQuestion({ onPress }) {
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
      {createIncrementalArray(8).map(length => (
        <AnswerButton
          style={{ flexBasis: '48%', height: '23%' }}
          onPress={() => onPress({ id: length, label: length })}
          key={length}
        >
          <Text weight="semiBold" color="white">
            {length}
          </Text>
        </AnswerButton>
      ))}
    </View>
  );
}
