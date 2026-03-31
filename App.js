import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [id, setId] = useState(0);
  const [nome, setNome] = useState('Espaço para o nome');
  const [nacionalidade, setNacionalidade] = useState('Espaço para a nacionalidade');
  const [carregando, setCarregando] = useState(false);

  async function buscarUserAsync() {
    try {
      setCarregando(true);
      const response = await fetch(
        `http://127.0.0.1:3000/usuario/${id}`
      );
      const dados = await response.json();
     
      setNome(dados.nome);
      setNacionalidade(dados.nacionalidade);
      setCarregando(false);
    } catch (erro) {
      console.error('Erro:', erro);
    }
  }

  function mostrarInformacoes() {
    if (carregando) {
      return <ActivityIndicator/>
    }
    else {
      return (
        <>
          <Text style={styles.marginBottom10}>{nome}</Text>
          <Text style={styles.marginBottom10}>{nacionalidade}</Text>
          <TextInput
            value={id}
            onChangeText={(text) => setId(text)}
          >
          </TextInput>
          <TouchableOpacity style={styles.button} onPress={buscarUserAsync}>
            <Text style={styles.buttonText}>
                Buscar usuário por ID
            </Text>
          </TouchableOpacity>
        </>
      );
    }
  }

  return (
    <View style={styles.container}>
      {mostrarInformacoes()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  button: {
    backgroundColor: 'red',
    width: '50%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  buttonText: {
    color: 'white'
  },
  marginBottom10: {
    marginBottom: 10
  }
});