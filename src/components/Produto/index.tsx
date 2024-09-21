import { Feather } from '@expo/vector-icons';
import { Container, ProdutoDelete, ProdutoDone, ProdutoText } from './styles';
import { ProdutoProps, RootStackParamList }  from '../../utils/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList>;

export function Produto({id, title, status, onCheck, onRemove}: ProdutoProps) {
    const [produto, setProoduto] = useState<ProdutoProps>({id, title, status, onCheck, onRemove});
    const navigation= useNavigation<Props['navigation']>();

    function handlePress() {
        navigation.navigate('Details', {id, title, status});
    }

    return(
        <Container onPress={() => handlePress()}>
            <ProdutoDelete onPress={onRemove} >
                <Feather name="trash-2" size={24} color="white"/>
            </ProdutoDelete>
            <ProdutoText>{title}</ProdutoText>
            <ProdutoDone onPress={onCheck} style={status ? {backgroundColor: '#0E9577'} : {}} >
                {!status && <Feather name="square" size={24} color="white" />}
                {status && <Feather name="check-square" size={24} color="white" />}
            </ProdutoDone>
        </Container>
    );
}