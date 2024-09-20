import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity` 
    width: 350px;
    height: 47px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #E2E2E2;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 16px;
`;

export const ProdutoText = styled.Text`
    color: #000000;
    font-size: 17px;
    font-weight: 500;
`;

export const ProdutoDone = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    background-color: #0E4865;
    justify-content: center;
    align-items: center;
    margin-right: 1px;

`;

export const ProdutoDelete = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    background-color: #8D1717;
    justify-content: center;
    align-items: center;
    margin-left: 1px;
`;
