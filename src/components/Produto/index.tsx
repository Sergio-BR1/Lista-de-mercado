import { Feather } from '@expo/vector-icons';
import { Container, ProdutoDelete, ProdutoDone, ProdutoText } from './styles';

type Props = {
    title: string;
    status: boolean;
    onCheck?: () => void;
    onRemove?: () => void;
}

export function Produto({title, status, onCheck, onRemove}: Props) {
    return(
        <Container>
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