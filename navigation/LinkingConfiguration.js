import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Home: 'home',
      Game: 'game',
      Scores: 'scores',
      NotFound: '*',
    },
  },
};
