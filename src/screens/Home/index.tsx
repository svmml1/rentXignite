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
import { Load } from '../../components/Load';
import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

interface Props {
    
}
export function Home(){
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    function handleCarDetails() {
        navigation.navigate('CarDetails')
    }

    useEffect(() => {
      async function fetchCars() {
          
        try {
            const response = await api.get('/cars')
            setCars(response.data)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
        
        }
        fetchCars()
    },[])

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
            {loading ? <Load /> : 
            <CarList 
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({item }) => 
            <Car data={item} 
            onPress={handleCarDetails} 
            />
        }
        />
        }

            
        
        </Container>
    );
}