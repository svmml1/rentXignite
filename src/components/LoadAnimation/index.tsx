import React from 'react';
import LottieView from 'lottie-react-native';

import loadingCar from '../../assets/lf30_editor_zbxezr2a.json';

import {
  Container
} from './styles';

export function LoadAnimation(){
  return (
    <Container>
      <LottieView
        source={loadingCar}
        style={{ height: 200 }}
        resizeMode="contain"
        autoPlay
        loop
      />
    </Container>
  );
}