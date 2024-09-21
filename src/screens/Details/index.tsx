import { Container, TextStatus, Title, TitleContainer, TopContainer, TopButton, TopText, StatusContainer, StatusCard, StatusIcon, StatusTextContainer, StatusText, StatusButtonDel } from "./styles";
import {Feather} from "@expo/vector-icons";
import { RootStackParamList } from "@/utils/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList>; 


export default function Details({route}: any) {

    const{id, title, status} = route.params;

    const navigation = useNavigation<Props['navigation']>();

    return (
        <Container>
            <TopContainer>
                <TopButton onPress={() => navigation.popToTop()}>
                    <Feather name="chevron-left" size={24} color="#1e1e1e" />
                    <TopText>Voltar</TopText>
                </TopButton>
            </TopContainer>
            <TitleContainer>
                <Title>{title}</Title>
            </TitleContainer>
            <TextStatus>Status do produto:</TextStatus>
            <StatusContainer>
                <StatusCard>
                    <StatusIcon style={status? {backgroundColor: "#0e9577"}: {}}>
                        {!status && <Feather name="square" size={24} color="white" />}
                        {status && <Feather name="check-square" size={24} color="white" />}
                    </StatusIcon>
                    <StatusTextContainer>
                        <StatusText>{status ? "Marcado": "Não marcado"}</StatusText>
                    </StatusTextContainer>
                </StatusCard>
                <StatusButtonDel>
                    <Feather name="trash-2" size={24} color="white" />
                </StatusButtonDel>
            </StatusContainer>
        </Container>

    );
}