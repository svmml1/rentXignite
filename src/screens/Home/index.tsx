import React, { useEffect, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../assets/logo.svg';
import { StatusBar } from 'react-native';
import {
    CarList,
    Container,
    Header,
    HeaderContent,
    TotalCars,
    
} from './styles';
import { Car } from '../../components/Car';

interface Props {
    
}
export function Home(){
    const navigation = useNavigation();
    const carData ={
        brand: 'Audi',
        name: 'R$ 5 Coupé',
        rent: {
            period: 'Ao Dia',
            price: 120,
        },
        thumbmail: 'https://cdn.picpng.com/audi/audi-face-28582.png'
        
    }

    function handleCarDetails() {
        navigation.navigate('CarDetails')
    }

    return (
        <Container>
            <StatusBar 
              barStyle="light-content"
              backgroundColor="transparent"
              translucent
            />

            <Header>
            <HeaderContent>
                <Logo 
                 width={RFValue(108)}
                 height={RFValue(12)}
                 />
                <TotalCars>
                    total 12 carros
                </TotalCars>
                 </HeaderContent>
            </Header>
            <CarList 
            data={[1,2,3,4,5,6]}
            keyExtractor={item => String(item)}
            renderItem={({item }) => 
            <Car data={carData} 
            onPress={handleCarDetails} 
            />
        }
            />

            
        
        </Container>
    );
}