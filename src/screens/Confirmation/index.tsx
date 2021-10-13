import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { ConfirmButton } from '../../components/ConfirmButton';

import {
  Container,
  Content,
  Title,
  Message,
  Footer,
} from './styles';

interface Params {
  title: string;
  message: string;
  nextScreenRoute: string;
}

export function Confirmation(){
  const navigation = useNavigation();
  const { width } = useWindowDimensions();


function handleConfirm() {
 navigation.navigate('Home');
 }

  return (
    <Container>
      <StatusBar 
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80}/>
        <Title>Carro Alugado!</Title>

        <Message>
        Agora você só precisa ir{'\n'}
        até a concessionária da RENTX{'\n'}
        pegar o seu automóvel.
        </Message>
      </Content>

      <Footer>
        <ConfirmButton 
        title="Ok"
        onPress={handleConfirm}
        />
      </Footer>
    </Container>
  );
}