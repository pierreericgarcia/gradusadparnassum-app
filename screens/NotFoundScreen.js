import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function NotFoundScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Erreur 404</Text>
      <Button title="Go Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}
