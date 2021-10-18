import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import * as Yup from 'yup';

import {
    Container,
    Header,
    Title,
    SubTitle,
    Form,
    Footer
} from './styles';
import { Button } from '../../components/Button';
import theme from '../../styles/theme';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

interface Props { }
export function SignIn() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

  const navigation = useNavigation();
    return (
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <Container>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
                />
            <Header>
                <Title>Estamos {'\n'} quase lá</Title>
                <SubTitle>
                    Faça seu login para começar{'\n'}
                    uma experiência incrível.
                </SubTitle>
            </Header>

            <Form>

            <Input 
            iconName="mail"
            placeholder="E-mail"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}    
            />
                   <PasswordInput 
            iconName="lock"
            placeholder="Senha"    
            onChangeText={setPassword}              
            value={password}
            />
            </Form>

            <Footer>
                <Button
                    title="Login"
                    onPress={() => { }}
                    enabled={true}
                    loading={false}
                    />

                <Button
                    title="Criar conta gratuita"
                    color={theme.colors.background_secondary}
                    light
                    
                    enabled={true}
                    loading={false}
                    />
          
            </Footer>
        </Container>
                    </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}