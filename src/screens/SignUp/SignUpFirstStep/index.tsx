import React, { useState } from 'react';
import { 
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import {
    Container,
    Header,
    Steps,
    Title,
    Subtitle,
    Form,
    FormTitle
  } from './styles';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

interface Props {}
export function SignUpFirstStep(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [driverLicense, setDriverLicense] = useState('');

    const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();    
  }

  async function handleNextStep() {
      try {
         const schema = Yup.object().shape({
            
             driverLicense: Yup.string()
             .required('CNH é Obrigatória'),
             email: Yup.string()
             .email('Email é inválido')
             .required('Email é obrigatório'),
             name: Yup.string()
            .required('Nome é obrigatório')            
         })
         const data = {name, email, driverLicense};
         await schema.validate(data) 
         console.log(data)
         navigation.navigate('SignUpSecondStep', {user: data})
      } catch (error) {
          if(error instanceof Yup.ValidationError){
              return Alert.alert('Opa', error.message)
          }
      }
  }
    return (
        <KeyboardAvoidingView behavior="position" enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Container>
            <Header>
              <BackButton onPress={handleBack} />
              <Steps>
                <Bullet active />
                <Bullet />
              </Steps>
            </Header>
  
            <Title>
              Crie sua{'\n'}conta
            </Title>
            <Subtitle>
              Faça seu cadastro de{'\n'}
              forma rápida e fácil
            </Subtitle>
  
            <Form>
              <FormTitle>1. Dados</FormTitle>
              <Input 
                iconName="user"
                placeholder="Nome"
                onChangeText={setName}
                value={name}
              />
              <Input 
                iconName="mail"
                placeholder="E-mail"
                keyboardType="email-address"
                onChangeText={setEmail}
                value={email}
              />
              <Input 
                iconName="credit-card"
                placeholder="CNH"
                keyboardType="numeric"
                onChangeText={setDriverLicense}
                value={driverLicense}
              />
            </Form>
  
            <Button 
              title="Próximo"      
               onPress={handleNextStep}
            />
  
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
}