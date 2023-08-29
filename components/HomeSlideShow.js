import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from './Text';
import { getRandomItem } from '../utils';

const images = {
  brahms: require('../assets/images/brahms.png'),
  faure: require('../assets/images/faure.png'),
  handel: require('../assets/images/handel.png'),
  liszt: require('../assets/images/liszt.png'),
  paganini: require('../assets/images/paganini.png'),
  saintSaens: require('../assets/images/saint-saens.png'),
};

const styles = StyleSheet.create({
  bottomText: { bottom: -30, left: -1, position: 'absolute' },
  container: {
    height: '100%',
    position: 'relative',
    width: '100%',
  },
  image: { height: '100%', width: '100%' },
  middleText: { position: 'absolute', right: 0, top: '40%' },
  topText: { left: -1, position: 'absolute', top: -30 },
});

export function HomeSlideShow() {
  const [currentImageKey, setCurrentImageKey] = useState(randomImageKey());

  function randomImageKey() {
    return getRandomItem(Object.keys(images));
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setCurrentImageKey(randomImageKey())}
      >
        <Image
          style={styles.image}
          source={images[currentImageKey]}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <Text style={styles.topText} size="xxxl" weight="black">
        GRADUS
      </Text>
      <Text style={styles.middleText} size="xxxl" weight="black">
        AD
      </Text>
      <Text style={styles.bottomText} size="xxxl" weight="black">
        PARNASSUM
      </Text>
    </View>
  );
}
