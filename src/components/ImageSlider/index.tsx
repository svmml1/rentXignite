import React from 'react';
import { FlatList, ViewToken } from 'react-native';

import {
    CarImage,
    CarImageWrapper,
    Container,
    ImageIndexe,
    ImageIndexes,

} from './styles';

interface Props {
    imagesUrl: string[];
}
export function ImageSlider() {
    return (
        <Container>
            <ImageIndexes>
                <ImageIndexe active={true} />
                <ImageIndexe active={false} />
                <ImageIndexe active={false} />
                <ImageIndexe active={false} />
            </ImageIndexes>

            <CarImageWrapper>
                <CarImage
                    source={{ uri: 'https://cdn.picpng.com/audi/audi-face-28582.png'}}
                    resizeMode="contain"
                />
            </CarImageWrapper>
        </Container>
    );
}