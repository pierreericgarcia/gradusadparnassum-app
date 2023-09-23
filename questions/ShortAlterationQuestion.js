import React from 'react';
import { View } from 'react-native';
import { AnswerButton } from '../components/AnswerButton';
import { alterations } from '../music-theory/notes';
import { Text } from '../components/Text';
import { spacing } from '../theme';

export default function ShortAlterationQuestion({ onPress }) {
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
      {[alterations.becarre, alterations.flat, alterations.sharp].map(
        alteration => (
          <AnswerButton
            style={{ flexBasis: '100%', height: '30%' }}
            onPress={() =>
              onPress({ id: alteration.id, label: alteration.symbol })
            }
            key={alteration.id}
          >
            <Text weight="semiBold" color="white">
              {alteration.symbol}
            </Text>
          </AnswerButton>
        ),
      )}
    </View>
  );
}
