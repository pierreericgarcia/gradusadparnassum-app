import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text } from '../components/Text';
import { BannerButton } from '../components/BannerButton';
import { HomeSlideShow } from '../components/HomeSlideShow';
import { Header } from '../components/Header';
import { colors, spacing } from '../theme';
import { ScrollingQuote } from '../components/ScrollingQuote';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        <ScrollingQuote />
        <View style={styles.imageContainer}>
          <HomeSlideShow />
        </View>
        <BannerButton
          onPress={() => {
            navigation.navigate('Game');
          }}
        >
          <Text color="white" weight="bold">
            COMMENCER
          </Text>
        </BannerButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  imageContainer: {
    height: '60%',
    paddingHorizontal: spacing.lg,
    width: '100%',
  },
});
