import React from 'react';
import { View } from 'react-native';
import { AnswerButton } from '../components/AnswerButton';
import { naturalNotes } from '../music-theory/notes';
import { Text } from '../components/Text';
import { spacing } from '../theme';

export default function NoteQuestion({ onPress }) {
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
      {Object.values(naturalNotes).map(note => (
        <AnswerButton
          style={{ flexBasis: '48%', height: '23%' }}
          onPress={() => onPress({ id: note.id, label: note.label })}
          key={note.id}
        >
          <Text weight="semiBold" color="white">
            {note.label}
          </Text>
        </AnswerButton>
      ))}
    </View>
  );
}
