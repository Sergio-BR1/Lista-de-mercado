export type ProdutoProps = {
    id: number;
    title: string;
    status: boolean;
    onCheck?: () => void;
    onRemove?: () => void;
};

export type RootStackParamList = {
    Home: undefined;
    Details: ProdutoProps;
};