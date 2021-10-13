import React, {useEffect, useState} from 'react';
import {MaterialIcons} from '@expo/vector-icons';
import { useTheme } from 'styled-components'; 
import { useNavigation, useRoute } from '@react-navigation/native';
import SpeedSvg from '../../assets/speed.svg'
import AccelerationSvg from '../../assets/acceleration.svg'
import ForceSvg from '../../assets/force.svg'
import GasolineSvg from '../../assets/gasoline.svg'
import ExchangeSvg from '../../assets/exchange.svg'
import PeopleSvg from '../../assets/people.svg'

import {
    About,
    Accessories,
    Brand,
    CarImages,
    Container, 
    Content,
    Description, 
    Details, 
    Footer, 
    Header,
    Name,
    Period,
    Price,
    Rent,
} from './styles';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

interface Props {
    color: string
}
export function CarDetails(){
    const navigation = useNavigation();
    const theme = useTheme()

    function handleConfirmRental() {
        navigation.navigate('Scheduling');
      }

    function handleBack(){
        navigation.goBack();    
      }
    return (
        <Container>
           <Header>
            <BackButton 
            onPress={handleBack}
            />
           </Header>
            <CarImages>
            <ImageSlider 
           imagesUrl={[ 'https://cdn.picpng.com/audi/audi-face-28582.png']}
           />
            </CarImages>
            <Content>

           <Details>
               <Description>
                   <Brand>Lamborguine</Brand>
                   <Name>Hurracan</Name>
               </Description>
               <Rent>
                   <Period>Ao Dia</Period>
                   <Price>R$ 580</Price>
               </Rent>
           </Details>

           <Accessories>
               <Accessory 
               name="380km/h"
               icon={SpeedSvg}
               />
               <Accessory 
               name="3.2s"
               icon={AccelerationSvg}
               />
               <Accessory 
               name="380 HP"
               icon={ForceSvg}
               />
               <Accessory 
               name="Gasolina"
               icon={GasolineSvg}
               />
               <Accessory 
               name="Auto"
               icon={ExchangeSvg}
               />
               <Accessory 
               name="2 pessoas"
               icon={PeopleSvg}
               />
           </Accessories>
           <About>
           Este é automóvel desportivo. Surgiu do lendário touro de lide indultado na praça Real Maestranza de Sevilla. É um belíssimo carro para quem gosta de acelerar.
           </About>
           
            </Content>
            <Footer>
                <Button 
                title="Escolher período do aluguel"
                onPress={handleConfirmRental}
                />
            </Footer>
        </Container>
    );
}