import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image'

interface ImageIndexProps {
    active: boolean;
}

export const Container = styled.View`
  width: 100%;
`;

export const ImageIndexes = styled.View`
  flex-direction: row;
  align-self: flex-end;
  padding-right: 24px;
`;
export const ImageIndexe = styled.View<ImageIndexProps>`
  width: 6px;
  height: 6px;
  border-radius: 8;
  background-color: ${({theme, active}) => 
  active ? theme.colors.title : theme.colors.shape
  };
`;

export const CarImageWrapper = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: 132px;
  justify-content: center;
  align-items: center;
`;

export const CarImage = styled.Image`
  width: 280px;
  height: 132px;
`;