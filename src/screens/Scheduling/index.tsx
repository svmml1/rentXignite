import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import ArrowSvg from '../../assets/arrow.svg';
import { useNavigation, useRoute } from '@react-navigation/native';

import {
    Container,
    Content,
    DateInfo,
    DateTitle,
    DateValue,
    Footer,
    Header,
    RentalPeriod,
    Title,
} from './styles';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

interface Props { }
export function Scheduling() {
    const navigation = useNavigation();
    const theme = useTheme()

    function handleConfirmRental() {
        navigation.navigate('SchedulingDetails')
    }

      function handleBack(){
        navigation.goBack() 
    }

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
                    Escolha uma{'\n'}
                    data de início e {'\n'}
                    fim do aluguel
                </Title>

                <RentalPeriod>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue />
                    </DateInfo>
                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue >

                        </DateValue>
                    </DateInfo>
                </RentalPeriod>
            </Header>
            <Content>
                <Calendar />
                <Footer>
                    <Button 
                    title="Confirmar"
                    onPress={handleConfirmRental}
                    />
                </Footer>
            </Content>
        </Container>
    );
}