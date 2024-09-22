import { Feather } from '@expo/vector-icons';
import { Container, ProdutoDelete, ProdutoDone, ProdutoText } from './styles';
import { ProdutoProps, RootStackParamList }  from '../../utils/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ProdutoContext } from '@/context/ProdutoContext';


type Props = NativeStackScreenProps<RootStackParamList>;

export function Produto(props: ProdutoProps) {
    
    const navigation= useNavigation<Props['navigation']>();
    const {selectProduto} = useContext(ProdutoContext);

    function handlePress() {
        navigation.navigate('Details');
        selectProduto(props);
    }

    return(
        <Container onPress={() => handlePress()}>
            <ProdutoDelete onPress={props.onRemove} >
                <Feather name="trash-2" size={24} color="white"/>
            </ProdutoDelete>
            <ProdutoText>{props.title}</ProdutoText>
            <ProdutoDone onPress={props.onCheck} style={props.status ? {backgroundColor: '#0E9577'} : {}} >
                {!props.status && <Feather name="square" size={24} color="white" />}
                {props.status && <Feather name="check-square" size={24} color="white" />}
            </ProdutoDone>
        </Container>
    );
}