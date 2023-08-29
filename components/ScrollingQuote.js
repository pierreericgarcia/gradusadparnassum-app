import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Easing } from 'react-native-reanimated';
import TextTicker from 'react-native-text-ticker';
import { Text } from './Text';
import { getRandomItem } from '../utils';

const quotes = [
  {
    quote: 'Nulla die sine linea',
    author: 'Horace',
  },
  {
    quote: 'Ars sine scienta nihil est',
    author: 'Mignot',
  },
  {
    author: 'Hippocrate',
    quote: 'Vita brevis, ars longa',
  },
  {
    author: 'Sénèque',
    quote: 'Errare humanum est, perseverare diabolicum',
  },
  {
    author: 'Ovide',
    quote: 'Tempora mutantur, nos et mutamur in illis',
  },
];

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingVertical: 8,
  },
});

export function ScrollingQuote() {
  const randomQuote = getRandomItem(quotes);

  return (
    <View style={styles.container}>
      <TextTicker
        duration={10000}
        loop
        bounce={false}
        easing={Easing.linear}
        repeatSpacer={0}
      >
        {[randomQuote, randomQuote].map(({ quote, author }, index) => (
          <React.Fragment key={`${quote}-${index}`}>
            <Text weight="semiBold"> {quote.toUpperCase()} </Text>
            <Text secondary weight="light">
              {' '}
              ({author}){' '}
            </Text>
          </React.Fragment>
        ))}
      </TextTicker>
    </View>
  );
}
