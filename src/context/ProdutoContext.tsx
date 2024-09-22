import { ReactNode, createContext, useState, useEffect } from "react";
import {ProdutoProps} from "../utils/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ProdutoContextProps {
    produto: ProdutoProps, 
    produtos: ProdutoProps[],
    selectProduto: (produto: ProdutoProps) => void, 
    clearProduto: () => void, 
    createProduto: (title: string) => void,
    setProdutos: ([]: ProdutoProps[]) => void,
}

interface ProdutoProviderProps {
    children: ReactNode;

}

export const ProdutoContext = createContext<ProdutoContextProps>(
    {
        produto: {id: 0, title: '', status: false}, 
        produtos: [],
        selectProduto:()=>{}, 
        clearProduto: ()=>{},
        createProduto: ()=> {},
        setProdutos: () => {}

     }
)

function ProdutoProvider({children}: ProdutoProviderProps) {
    const [produto, setProduto] = useState<ProdutoProps>({id: 0, title: '', status: false});
    const [produtos, setProdutos] = useState<ProdutoProps[]>([] as ProdutoProps[]);

    async function storeProdutos(produtos: ProdutoProps[]) {
        try {
            await AsyncStorage.setItem("@produtos", JSON.stringify(produtos));
        }
        catch(error) {
            console.log(error);
        }
        
    }

    async function loadProdutos() {
        try {
            const produtos = await AsyncStorage.getItem("@produtos");
            if(produtos) {
                setProdutos(JSON.parse(produtos));
            }
        }catch(error) {
            console.log(error);
        }
    }

    function createProduto(title: string) {
        const newProduto = {
            id: produtos.length+1,
            title: title,
            status: false,
        };
        setProdutos([...produtos, newProduto]);
    }



    function selectProduto(produto: ProdutoProps) {
        setProduto(produto);
    }

    function clearProduto() {
        setProduto({id: 0, title: '', status: false});
    }
    
    useEffect(() => {
        loadProdutos();
    }, []);

    useEffect(()  => {
        storeProdutos(produtos);
    }, [])

    return (
        <ProdutoContext.Provider value={{produto, selectProduto, clearProduto, produtos, createProduto, setProdutos}}>
         {children}
        </ProdutoContext.Provider>
    );
}

export default ProdutoProvider;