import React, { useEffect, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../assets/logo.svg';
import { Ionicons } from '@expo/vector-icons'
import { StatusBar, StyleSheet, BackHandler, Alert } from 'react-native';
import {
    CarList,
    Container,
    Header,
    HeaderContent,
    MyCarsButton,
    TotalCars,
    
} from './styles';
import { useNetInfo } from '@react-native-community/netinfo';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';
import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { useTheme } from 'styled-components';

import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import { LoadAnimation } from '../../components/LoadAnimation';
import { synchronize } from '@nozbe/watermelondb/sync';
import { database } from '../../database';
import { Button } from '../../components/Button';
import { Car as ModelCar } from '../../database/model/Car';
//const ButtonAnimated = Animated.createAnimatedComponent(RectButton)


export function Home(){
    const [cars, setCars] = useState<ModelCar[]>([]);
    const [loading, setLoading] = useState(true);
    const netInfo = useNetInfo();
    const navigation = useNavigation();
    const theme = useTheme();

    function handleCarDetails(car: CarDTO) {
        navigation.navigate('CarDetails', {car})
    }

    function handleOpenMyCars() {
        navigation.navigate('MyCars')
    }


    async function offlineSynchronize(){
        await synchronize({
          database,
          pullChanges: async ({ lastPulledAt }) => {
            const response = await api
            .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);
            
            const { changes, latestVersion } = response.data;
            console.log('Erro aqui')
            console.log(changes)
            return { changes, timestamp: latestVersion }
          },
          pushChanges: async ({ changes }) => {
            const user = changes.users;
            console.log('Erro aqui api')
            await api.post('/users/sync', user).catch(console.log);
          },
        });
      }
    useEffect(() => {
        let isMounted = true;
        
        async function fetchCars() {
          try {
            const carCollection = database.get<ModelCar>('cars');
            const cars = await carCollection.query().fetch();
            
    
            if(isMounted){
              setCars(cars);
            }
          } catch (error) {
            console.log(error);        
          }finally{
            if(isMounted){
              setLoading(false);
            }
          }
        }
    
        fetchCars();
        return () => {
          isMounted = false;
        };
      },[]);


      useEffect(() => {
        if(netInfo.isConnected === true){
          offlineSynchronize();
        }
      },[netInfo.isConnected])
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
                {
                    !loading &&
                    <TotalCars>
                    total de { cars.length } carros
                </TotalCars>
                }
                 </HeaderContent>
            </Header>
            {loading ? <LoadAnimation /> : 
            <CarList 
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({item }) => 
            <Car data={item} 
            onPress={() => handleCarDetails(item)} 
            />
        }
        />
        }        
        
        </Container>
    );
}

const styles = StyleSheet.create({
    button: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center'
    },
  })