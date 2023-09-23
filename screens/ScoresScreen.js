import { Image, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Text } from '../components/Text';
import { Header } from '../components/Header';
import { colors } from '../theme';
import { BannerButton } from '../components/BannerButton';
import angel1 from '../assets/images/angel_1.png';
import angel2 from '../assets/images/angel_2.png';
import handHoldingBook from '../assets/images/hand-holding-book.png';

export default function ScoresScreen() {
  const {
    params: { gameStats },
  } = useRoute();
  const navigation = useNavigation();

  const getStreakJoke = () => {
    if (gameStats.bestStreak < 2) {
      return 'pas dingue.';
    }
    if (gameStats.bestStreak < 4) {
      return 'pas mal, pas mal.';
    }
    if (gameStats.bestStreak <= 8) {
      return 'lâche rien.';
    }
    if (gameStats.bestStreak > 8) {
      return "là c'est fort";
    }
  };

  const getErrorsJoke = () => {
    if (gameStats.errors === 0) {
      return "c'est clean.";
    }
    if (gameStats.errors < 2) {
      return 'ça passe.';
    }
    if (gameStats.errors <= 8) {
      return "c'est beaucoup.";
    }
    if (gameStats.errors > 8) {
      return 'aïe aïe aïe.';
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View
        style={{
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          style={{
            position: 'absolute',
            top: '-30%',
            left: '-18%',
            height: 100,
          }}
          source={angel2}
          resizeMode="contain"
        />
        <Image
          style={{
            position: 'absolute',
            top: '-30%',
            right: '-27%',
            height: 100,
          }}
          source={angel1}
          resizeMode="contain"
        />
        <Text style={{ textAlign: 'center' }} size="xxl" weight="bold">
          SCORE
        </Text>
        <Text
          style={{ textAlign: 'center' }}
          size="xxl"
          weight="light"
          secondary
        >
          ({gameStats.score} Points)
        </Text>
        <Text style={{ textAlign: 'center' }} size="xxl" weight="bold">
          RÉPONSES CONSÉCUTIVES
        </Text>
        <Text
          style={{ textAlign: 'center' }}
          size="xxl"
          weight="light"
          secondary
        >
          ({gameStats.bestStreak}, {getStreakJoke()})
        </Text>
        <Text style={{ textAlign: 'center' }} size="xxl" weight="bold">
          ERREURS
        </Text>
        <Text
          style={{ textAlign: 'center' }}
          size="xxl"
          weight="light"
          secondary
        >
          ({gameStats.errors}, {getErrorsJoke()})
        </Text>
      </View>
      <Image
        style={{
          position: 'absolute',
          bottom: 65,
          left: '50%',
          height: 100,
        }}
        source={handHoldingBook}
        resizeMode="contain"
      />

      <BannerButton
        style={{ position: 'relative' }}
        onPress={() => {
          navigation.navigate('Game');
        }}
      >
        <Text color="white" weight="bold">
          RECOMMENCER
        </Text>
      </BannerButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'space-between',
  },
});
