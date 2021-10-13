import React, {useEffect, useState} from 'react';
import {MaterialIcons} from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components'; 
import { Feather } from '@expo/vector-icons';
import SpeedSvg from '../../assets/speed.svg'
import AccelerationSvg from '../../assets/acceleration.svg'
import ForceSvg from '../../assets/force.svg'
import GasolineSvg from '../../assets/gasoline.svg'
import ExchangeSvg from '../../assets/exchange.svg'
import PeopleSvg from '../../assets/people.svg'

import {
    Accessories,
    Brand,
    CalendarIcon,
    CarImages,
    Container, 
    Content,
    DateInfo,
    DateTitle,
    DateValue,
    Description, 
    Details, 
    Footer, 
    Header,
    Name,
    Period,
    Price,
    Rent,
    RentalPeriod,
    RentalPrice,
    RentalPriceDetails,
    RentalPriceLabel,
    RentalPriceQuota,
    RentalPriceTotal,
} from './styles';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props {
    color: string
}
export function SchedulingDetails(){
    const navigation = useNavigation();

    function handleConfirmRental() {
        navigation.navigate('Confirmation')
    }

    function handleBack(){
        navigation.goBack();    
      }
    const theme = useTheme()
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
            <RentalPeriod>
                <CalendarIcon>
                    <Feather 
                    name="calendar"
                    size={RFValue(24)}
                    color={theme.colors.shape}
                    />
                </CalendarIcon>
                <DateInfo>
                    <DateTitle>DE</DateTitle>
                    <DateValue>18/06</DateValue>
                </DateInfo>
                <Feather 
                    name="chevron-right"
                    size={RFValue(20)}
                    color={theme.colors.text}
                    />
                     <DateInfo>
                    <DateTitle>DE</DateTitle>
                    <DateValue>18/06</DateValue>
                </DateInfo>
            </RentalPeriod>
           <RentalPrice>
               <RentalPriceLabel>TOTAL</RentalPriceLabel>
               <RentalPriceDetails>
                   <RentalPriceQuota>R$ 580 3x diárias</RentalPriceQuota>
                   <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
               </RentalPriceDetails>
           </RentalPrice>
            </Content>
            <Footer>
                <Button 
                title="Alugar agora"
                color={theme.colors.success} 
                onPress={handleConfirmRental}
                />
            </Footer>
        </Container>
    );
}