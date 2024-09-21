import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { InputAddProduto } from './src/components/InputAddProduto';
import { Produto } from './src/components/Produto';
import { CardNumber } from './src/components/CardNumber';

export default function App() {

  const [produtos, setProdutos] = useState<{description: string; check: boolean}[]>([]);
  const [produtoText, setProdutoText] = useState("");
  const [countProduto, setCountProduto] = useState(0);
  const [countProdutoCheck, setCountProdutoCheck] = useState(0);

  function handleProdutoAdd() {
    if(produtoText == "") {
      console.log('vazio');
      return Alert.alert("Erro", "Produto está sem descrição.");
    }

    if(produtos.some((produto)=> produto.description === produtoText)) {
      console.log('Produto já existe!');
      return Alert.alert("Erro", "Produto já existe!");
    }

    const newProduto = {description: produtoText, check: false};
    setProdutos([...produtos, newProduto]);
    setProdutoText('');
  }

  function handleProdutoChangeStatus(produtoToChange: {description: string;  check: boolean}) {
    const updatedProdutos = produtos.filter((produto)=> produto.description !== produtoToChange.description);
    const newProduto =  {
      description: produtoToChange.description,
      check: !produtoToChange.check,
    }
    if (newProduto.check) {
      setCountProdutoCheck(countProdutoCheck + 1);
    }
    else {
      setCountProdutoCheck(countProdutoCheck - 1);
    }
    updatedProdutos.push(newProduto);
    setProdutos(updatedProdutos);
  }

  function handleProdutoDelete (produtoToDelete: {description: string; check: boolean;}) {
    Alert.alert("Atenção!", `Deseja realmente removar o produto? ${produtoToDelete.description}`,
      [
        {text: "Sim",
          onPress: () => {
            if (produtoToDelete.check) {
              setCountProdutoCheck(countProdutoCheck - 1);
            }
            const updatedProdutos = produtos.filter((produto) => produto !== produtoToDelete)
            setProdutos(updatedProdutos);
          }

        },
        {text: "Cancelar", style: "cancel"}
      ]      
    ) 

  }

  useEffect(() => {
    let totalProdutos = produtos.length;
    setCountProduto(totalProdutos);
  }, [produtos]); 


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <InputAddProduto onPress={handleProdutoAdd} onChangeText={setProdutoText} value={produtoText}/>

      <View style={{flexDirection: 'row', gap: 16}}>
      <CardNumber title={"Na lista"} num={countProduto} color={"#1e1e1e"}/>
        <CardNumber title={"Marcadas"} num={countProdutoCheck} color={"#E8BA1A"}/>
        <CardNumber title={"Não marcadas"} num={countProduto-countProdutoCheck} color={"#0E9577"}/>
      </View>
      <View style={styles.produtos}>
        <Text>Tarefas: {countProduto}</Text>

        <FlatList
          data={produtos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={
            ({item}) => (
              <Produto 
                title={item.description}
                status={item.check}
                onCheck={()=>handleProdutoChangeStatus(item)}
                onRemove={()=>handleProdutoDelete(item)}

              />
            )
          }
          ListEmptyComponent={() => (
            <View>
              <Text>Você ainda não cadastrou Produtos!</Text>
              <Text>Adicione um produto para começar.</Text>
            </View>
          )}
          />
        <StatusBar style="auto" />
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCEEC9',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
    paddingTop: 65,
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row', 
    borderRadius: 4,
    backgroundColor: '#252627',
  },
  input: {
    flex: 1,
    padding: 16,
    color: '#FFFFFF',
  },
  inputButton: {
    backgroundColor: '#1e1e1e',
    padding: 16,
    borderRadius: 4,
  },
  produtos: {
    justifyContent: 'flex-start',
    width: '100%',
    flexDirection: 'column',

  }
});


