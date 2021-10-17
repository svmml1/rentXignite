import React, { useState, useEffect } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/core';
import { AntDesign } from '@expo/vector-icons';
import { parseISO, format } from 'date-fns';
import {
    Container,
    Header,
    Title,
    SubTitle,
    Content,
    Appointments,
    AppointmentsTitle,
    AppointmentsQuantity,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate,
} from './styles';
import { api } from '../../services/api';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/CarDTO';
import { Load } from '../../components/Load';

interface CarProps {
    id: string;
    user_id: string;
    car: CarDTO;
    startDate: string;
    endDate: string;
  }
  
  interface DataProps {
    id: string;
    car: CarDTO; 
    start_date: string;
    end_date: string;  
  }
export function MyCars() {
    const [cars, setCars] = useState<CarProps[]>([])
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();
    const theme = useTheme();

    function handleBack() {
        navigation.goBack();
    }

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('/schedules_byuser?user_id=1');

                setCars(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchCars();
    }, [])
    return (
        <Container>
            <Header>
                <StatusBar
                    barStyle="light-content"
                    translucent
                    backgroundColor="transparent"
                />
                <BackButton
                    onPress={handleBack}
                    color={theme.colors.shape}
                />

                <Title>
                    Escolha uma {'\n'}
                    data de início e {'\n'}
                    fim do aluguel
                </Title>

                <SubTitle>
                    Conforto, segurança e praticidade.
                </SubTitle>
            </Header>

  {  loading ? <Load />  :        
  <Content>
           <Appointments>
               <AppointmentsTitle> agendamentos feitos</AppointmentsTitle>
               <AppointmentsQuantity> {cars.length} </AppointmentsQuantity>
           </Appointments>

           <FlatList 
           data={cars}
           keyExtractor={item => item.id}
           showsVerticalScrollIndicator={false}
           renderItem={({item }) => (
            <CarWrapper>
            <Car data={item.car} />
            <CarFooter>
              <CarFooterTitle>Período</CarFooterTitle>
              <CarFooterPeriod>
                <CarFooterDate>{item.startDate}</CarFooterDate>
                <AntDesign 
                  name="arrowright"
                  size={20}
                  color={theme.colors.title}
                  style={{ marginHorizontal: 10 }}
                />
                <CarFooterDate>{item.endDate}</CarFooterDate>
              </CarFooterPeriod>
            </CarFooter>
          </CarWrapper>
           )} 
           />
           </Content> 
           }
        </Container>
    );
}