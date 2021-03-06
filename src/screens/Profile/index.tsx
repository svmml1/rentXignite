import React, { useState } from 'react';
import { 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard,
  Alert
} from 'react-native';

import { BackButton } from '../../components/BackButton';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/core';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/auth';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import {
    Container, 
    Header,
    HeaderTitle,
    HeaderTop,
    LogoutButton,
    PhotoContainer,
    Photo,
    PhotoButton,
    Content,
    Option,
    OptionTitle,
    Options,
    Section
} from './styles';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { Button } from '../../components/Button';
import { useNetInfo } from '@react-native-community/netinfo';

interface Props {}
export function Profile(){  
    const { user, signOut, updatedUser } = useAuth()
    const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
    const [avatar, setAvatar] = useState(user.avatar);
    const [name, setName] = useState(user.name);
    const [driverLicense, setDriverLicense] = useState(user.driver_license); 
    const theme = useTheme();
    const navigation = useNavigation();
    const netInfo = useNetInfo();

    function handleBack() {
        navigation.goBack()
    }

    async function handleAvatarSelect() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
             aspect: [4,4],
             quality: 1,  
        });
        if(result.cancelled){
            return
        }
        if(result.uri){
            setAvatar(result.uri)
        }
    }

    function handleOptionChange( optionSelected: 'dataEdit' | 'passwordEdit'){
        if(!netInfo.isConnected === true && optionSelected === 'passwordEdit'){
            Alert.alert('Para mudar a senha , conencte-se a internet')
        }else {
            setOption(optionSelected)
        }
    } 

    async function handleProfileUpdate() {
        try {
          const schema = Yup.object().shape({
             driverLicense: Yup.string()
             .required('CNH ?? obrigat??ria'),
             name: Yup.string()
             .required('Nome ?? obrigat??rio')
          });
          
          const data = {name, driverLicense}
          await schema.validate(data)

          await updatedUser({
              id: user.id,
              user_id: user.user_id,
              email: user.email,
              name,
              driver_license: driverLicense,
              avatar,
              token: user.token
          })

          Alert.alert('Perfil atualizado!')

        } catch (error) {
            if(error instanceof Yup.ValidationError ){
            Alert.alert('Opa', error.message)  
            }
           Alert.alert('N??o foi poss??vel atualizar o perfil')     
        }
    }

    async function handleSignOut() {
       Alert.alert(
         'Tem certeza?',
         ' se voc?? sair, ir?? precisar de internet para conectar-se novamente',
         [
             {
                 text: 'cancelar',
                 onPress: () => {}
             },
             {
                 text: 'sair',
                 onPress: () => signOut()
             }
         ]  
       ) 
    }
    return (
        <KeyboardAvoidingView behavior="position" enabled>
             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
            <Header>
                <HeaderTop>
                <BackButton  color={theme.colors.shape} onPress={handleBack}/>
                <HeaderTitle>Editar Perfil</HeaderTitle>
                <LogoutButton onPress={handleSignOut} >
                <Feather name="power" size={24} color={theme.colors.shape} />
                </LogoutButton>
                </HeaderTop>
                <PhotoContainer>
                { !!avatar && <Photo source={{ uri: avatar }}/>}
                   <PhotoButton onPress={handleAvatarSelect} >
                    <Feather 
                    name="camera"
                    size={24}
                    color={theme.colors.shape}
                    />   
                   </PhotoButton>     
                </PhotoContainer>
            </Header>
            <Content >
                <Options >
                    <Option 
                    onPress={() => handleOptionChange('dataEdit')}
                    active={option === 'dataEdit'}>
                        <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>      

                    </Option>
                <Option 
                onPress={() => handleOptionChange('passwordEdit')}
                active={option === 'passwordEdit'}>
                  <OptionTitle active={option === 'passwordEdit'}>Trocar Senha</OptionTitle>      
                </Option>
                </Options>
            </Content>
         {  
         option === 'dataEdit' ?
         <Section style={{ marginBottom: useBottomTabBarHeight() }}>
              <Input 
              iconName="user"
              placeholder="Nome"
              autoCorrect={false}
              defaultValue={user.name}
              onChangeText={setName}
              /> 

              <Input 
              iconName="mail"
              editable={false}
              defaultValue={user.email}
              
              />
              <Input 
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              defaultValue={user.driver_license}
              onChangeText={setDriverLicense}  
              />   

            <Button 
            title="Salvar altera????es"
            onPress={handleProfileUpdate}
            />
            </Section>
                :
            <Section>
              <PasswordInput 
                iconName="lock"
                placeholder="Senha atual"
              />
              <PasswordInput 
                iconName="lock"
                placeholder="Nova senha"
              />
              <PasswordInput 
               iconName="lock"
               placeholder="Repetir senha"                                    
              />
            </Section>
            }
            
        </Container>
        </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
    );
}