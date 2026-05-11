import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function minecraft() {
  const [likes, setLikes] = useState(0);

  return (
    <SafeAreaView style={estilos.container}>

      <View style={estilos.barraSuperior}>
        <Ionicons name="menu" size={28} />
        <Stack /> 
        <Text style={estilos.tituloBarra}>
          Informações
        </Text>

        <Ionicons name="settings-outline" size={24} />
        <Ionicons name="person-circle-outline" size={28} />
      </View>

      <ScrollView>

       
        <View style={estilos.cartaoGrande}>
          <Image
            source={require('./minecraft.jpg')}
            style={estilos.imagemGrande}
          />

          <Text style={estilos.tituloJogoGrande}>
            Minecraft
          </Text>

          <TouchableOpacity style={estilos.botao}>
            <Text style={estilos.textoBotao}>Jogar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setLikes(likes + 1)} style={estilos.likeButton}>
            <Text style={estilos.likeButtonText}>Gostei {likes}</Text>
          </TouchableOpacity>

          <Text style={estilos.info}>
            Espaço necessário: 49,95 gb
          </Text>

          <Text style={estilos.info}>
            Última sessão: 5 de dez. 2018
          </Text>

          <Text style={estilos.info}>
            Tempo de jogo: 18,5 horas
          </Text>

          <Text style={estilos.info}>
            Conquistas:
          </Text>

          <View style={estilos.acoes}>
            <TouchableOpacity onPress={() => Alert.alert('Atenção', 'Não é possível editar jogos padrão.')}>
              <Text style={estilos.editar}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert('Atenção', 'Não é possível excluir jogos padrão.')}>
              <Text style={estilos.excluir}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      <Link href="/" style={estilos.link}>
      Voltar
    
      </Link>

    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6D6565',
    paddingTop: 50,
    paddingHorizontal: 15
  },

  barraSuperior: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
  },

  tituloBarra: {
    fontSize: 30,
    fontWeight: 'bold'
  },

  cartaoGrande: {
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    padding: 15,
    marginTop: 20
  },

  imagemGrande: {
    width: '100%',
    height: 180,
    borderRadius: 15,
    marginBottom: 10
  },

  tituloJogoGrande: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10
  },

  botao: {
    backgroundColor: '#29712b',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 10
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold'
  },

  likeButton: {
    backgroundColor: '#38a709d4',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 10
  },

  likeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14
  },

  info: {
    fontSize: 20,
    color: '#333',
    marginBottom: 75
  },

  link: {
    backgroundColor: '#29712b',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 15,
    marginLeft: 15
  },

  textoLink: {
    color: '#fff',
    fontWeight: 'bold'
  },

  acoes: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
  },

  editar: {
    color: '#007bff',
    fontWeight: '700',
    fontSize: 16,
  },

  excluir: {
    color: '#f38ba8',
    fontWeight: '700',
    fontSize: 16,
  }
});