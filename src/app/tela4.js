import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function Tela4() {
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
            source={require('./fortnite.jpg')}
            style={estilos.imagemGrande}
          />

          <Text style={estilos.tituloJogoGrande}>
            Fortnite
          </Text>

          <TouchableOpacity style={estilos.botao}>
            <Text style={estilos.textoBotao}>Jogar</Text>
          </TouchableOpacity>

          <Text style={estilos.info}>
            Espaço necessário: 60,95 gb
          </Text>

          <Text style={estilos.info}>
            Última sessão: 2 de dez. 2025
          </Text>

          <Text style={estilos.info}>
            Tempo de jogo: 7,9 horas
          </Text>

          <Text style={estilos.info}>
            Conquistas:
          </Text>
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
  }
});