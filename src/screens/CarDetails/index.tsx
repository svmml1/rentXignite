import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import SpeedSvg from '../../assets/speed.svg'

import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    Extrapolate
} from 'react-native-reanimated';

import {
    About,
    Accessories,
    Brand,
    CarImages,
    Container,
    Description,
    Details,
    Footer,
    Header,
    Name,
    OfflineInfo,
    Period,
    Price,
    Rent,
} from './styles';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Car as ModelCar } from '../../database/model/Car';
import { api } from '../../services/api';
import { useNetInfo } from '@react-native-community/netinfo';
interface Params {
    car: ModelCar
}
export function CarDetails() {
    const [carUpdate, setCarUpdate] = useState<CarDTO>({} as CarDTO);
    const netInfo = useNetInfo();
    const scrollY = useSharedValue(0);
    const navigation = useNavigation();
    const theme = useTheme()
    const route = useRoute();
    const { car } = route.params as Params;

    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y
        console.log(event.contentOffset.y)
    })

    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 200],
                [200, 70],
                Extrapolate.CLAMP
            )
        }
    })


    const sliderCarsStyleAnimation = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollY.value,
                [0, 150],
                [1, 0],
                Extrapolate.CLAMP
            )
        }
    })
    function handleConfirmRental() {
        navigation.navigate('Scheduling', {
            car,
        });
    }

    function handleBack() {
        navigation.goBack();
    }

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
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />
            <Animated.View
            style={[
                headerStyleAnimation, 
                styles.header,
                { backgroundColor: theme.colors.background_secondary}
            ]}
            >
                <Header>
                    <BackButton
                        onPress={handleBack}
                    />
                </Header>
                <Animated.View style={sliderCarsStyleAnimation}>
                    <CarImages>

                    <ImageSlider
                        imagesUrl={
                            !!carUpdate.photos ? 
                            carUpdate.photos : [{ id: car.thumbnail, photo: car.thumbnail}]
                        }
                        />
                    </CarImages>

                </Animated.View>
            </Animated.View>

            <Animated.ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingTop: getStatusBarHeight() + 160
                }}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >

                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>
                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>R$ { netInfo.isConnected === true ? car.price : '...' }
                        </Price>
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
                <About>
                    {car.about}
                  
                </About>

            </Animated.ScrollView>
            <Footer>
                <Button
                    title="Escolher período do aluguel"
                    onPress={handleConfirmRental}
                    enabled={netInfo.isConnected === true}
                />
                {
                    netInfo.isConnected === false &&
                    <OfflineInfo>
                        Conecte-se a internet para ver mais detalhes e agendar seu carro
                    </OfflineInfo>
                }
            </Footer>
        </Container>
    );
}

const styles = StyleSheet.create({
    header: {
      position: 'absolute',
      overflow: 'hidden', 
      zIndex: 1,
    },
  })