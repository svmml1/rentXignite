import React, {useEffect, useState} from 'react';
import {MaterialIcons} from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components'; 
import { Feather } from '@expo/vector-icons';
import { format } from 'date-fns'

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
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import { getPlatformDate } from '../../utils/getPlatformDate';
import { api } from '../../services/api';
import { Alert } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';

interface Params {
    car: CarDTO;
    dates: string[];
    
}

interface RentalPeriod {
    start: string;
    end: string;
  }
export function SchedulingDetails(){
    const [loading, setLoading] = useState(false);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
    const [carUpdate, setCarUpdate] = useState<CarDTO>({} as CarDTO);
    const netInfo = useNetInfo();
    const navigation = useNavigation<any>();
    const theme = useTheme()
    const route = useRoute();
    const { car, dates } = route.params as Params;

    const rentTotal = Number(dates.length * car.price);

   async function handleConfirmRental() {
    setLoading(true)
       

        await api.post('/rentals', {
            user_id: 1,
            car_id: car.id,
            start_date: new Date(),
            end_date: new Date(),
            total: rentTotal
        })
    .then(() => { 
        navigation.navigate('Confirmation', {
        nextScreenRoute: 'Home',
        title: 'Carro Alugado!',
        message: `Agora s?? precisa ir\n buscar seu carro`
    })
})
    .catch(() => {
        setLoading(false)
        Alert.alert('N??o foi poss??vel confirmar agora.')})

        
    }

    function handleBack(){
        navigation.goBack();    
      }

    useEffect(() => {
        setRentalPeriod({
            start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            end: format(getPlatformDate(new Date(dates[dates.length -1])), 'dd/MM/yyyy'),
        })
    },[])  

    useEffect(() => {
        async function fetchCarUpdated() {
           const response = await api.get(`/cars/${car.id}`);
           setCarUpdate(response.data)
        }
        if(netInfo.isConnected === true){
            fetchCarUpdated()
        }
    }, [netInfo.isConnected])
    return (
        <Container>
           <Header>
            <BackButton 
            onPress={handleBack}
            />
           </Header>
            <CarImages>
            <ImageSlider
                        imagesUrl={
                            !!carUpdate.photos ? 
                            carUpdate.photos : [{ id: car.thumbnail, photo: car.thumbnail}]
                        }
                        />
            </CarImages>
            <Content>

           <Details>
               <Description>
                   <Brand>{car.brand}</Brand>
                   <Name>{car.name}</Name>
               </Description>
               <Rent>
                   <Period>{car.period}</Period>
                   <Price>R$ {car.price}</Price>
               </Rent>
           </Details>

           { carUpdate.accessories &&
                <Accessories>
                    {carUpdate.accessories.map(accessory => (

                        <Accessory
                            key={accessory.type}
                            name={accessory.name}
                            icon={getAccessoryIcon(accessory.type)}
                        />
                    ))
                    }

                </Accessories>
                }
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
                    <DateValue> {rentalPeriod.start} </DateValue>
                </DateInfo>
                <Feather 
                    name="chevron-right"
                    size={RFValue(20)}
                    color={theme.colors.text}
                    />
                     <DateInfo>
                    <DateTitle>At??</DateTitle>
                    <DateValue> {rentalPeriod.end} </DateValue>
                </DateInfo>
            </RentalPeriod>
           <RentalPrice>
               <RentalPriceLabel>TOTAL</RentalPriceLabel>
               <RentalPriceDetails>
                   <RentalPriceQuota>{`R$ ${car.price} x${dates.length} di??rias`}</RentalPriceQuota>
                   <RentalPriceTotal> R$ {rentTotal }</RentalPriceTotal>
               </RentalPriceDetails>
           </RentalPrice>
            </Content>
            <Footer>
                <Button 
                title="Alugar agora"
                color={theme.colors.success} 
                onPress={handleConfirmRental}
                enabled={!loading}
                loading={loading}
                />
            </Footer>
        </Container>
    );
}