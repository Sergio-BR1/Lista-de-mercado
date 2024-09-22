import { ReactNode, createContext, useState } from "react";
import {ProdutoProps} from "../utils/types";

interface ProdutoContextProps {
    produto: ProdutoProps;
    selectProduto: (produto: ProdutoProps) => void;
    clearProduto: () => void;
}

interface ProdutoProviderProps {
    children: ReactNode;

}

export const ProdutoContext = createContext<ProdutoContextProps>(
    {produto: {id: 0, title: '', status: false}, selectProduto:()=>{}, clearProduto: ()=>{} }
)

function ProdutoProvider({children}: ProdutoProviderProps) {
    const [produto, setProduto] = useState<ProdutoProps>({id: 0, title: '', status: false});
    function selectProduto(produto: ProdutoProps) {
        setProduto(produto);
    }

    function clearProduto() {
        setProduto({id: 0, title: '', status: false});
    }

    return (
        <ProdutoContext.Provider value={{produto, selectProduto, clearProduto}}>
         {children}
        </ProdutoContext.Provider>
    );
}

export default ProdutoProvider;