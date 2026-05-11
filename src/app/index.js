import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, Stack, useRouter } from 'expo-router';
import { db, initDb } from '../data/db';

initDb();

function getJogos() {
  return db.getAllSync('SELECT * FROM jogos ORDER BY id DESC');
}

export default function Index() {
  const router = useRouter();
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    setJogos(getJogos());
  }, []);

  return (
    <View style={estilos.container}>
      <Stack />

      <View style={estilos.barraSuperior}>
        <Pressable onPress={() => router.push('/cadastro')}>
          <Ionicons name="menu" size={28} />
        </Pressable>
        <TextInput  
          placeholder="Pesquisar"
          style={estilos.pesquisa}
        />
        <Ionicons name="settings-outline" size={24} /> 
        <Ionicons name="person-circle-outline" size={28} />
      </View>

      <Text style={estilos.titulo}>Meus jogos</Text>

      <ScrollView>

        <View style={estilos.cartao}>
          <Image
            source={require('./minecraft.jpg')}
            style={estilos.imagem}
          />
          <Link href="/jogo/minecraft">
          <View>
            <Text style={estilos.tituloJogo}>Minecraft</Text>
            <Text style={estilos.subtitulo}>Construção em mundo aberto</Text>
            
          </View>
          </Link>
        </View>
        

        <View style={estilos.cartao}>
          <Image
            source={require('./roblox.jpg')}
            style={estilos.imagem}
          />
          <Link href="/jogo/roblox">
          <View>
            <Text style={estilos.tituloJogo}>Roblox</Text>
            <Text style={estilos.subtitulo}>Universo virtual</Text>
            
          </View>
          </Link>
        </View>
        
        
 
        <View style={estilos.cartao}>
          <Image
            source={require('./gta5.jpg')}
            style={estilos.imagem}
          />
          <Link href="/jogo/gta5">
          
          <View>
            <Text style={estilos.tituloJogo}>Grand Theft Auto V</Text>
            <Text style={estilos.subtitulo}>Mundo aberto</Text>
         
           
          </View>
           </Link>
          
        </View>
      

        <View style={estilos.cartao}>
          <Image
            source={require('./fortnite.jpg')}
            style={estilos.imagem}
          />
          <Link href="/jogo/fortnite">
          <View>
            <Text style={estilos.tituloJogo}>Fortnite</Text>
            <Text style={estilos.subtitulo}>Battle Royale</Text>
            
          </View>
            </Link>
        </View>
        

        {jogos.map((item) => (
          <View key={item.id} style={estilos.cartao}>
            <View style={[estilos.imagem, { backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }]}>
              <Text style={{ fontSize: 24, color: '#666' }}>?</Text>
            </View>
            <Pressable onPress={() => router.push(`/jogo/${item.id}`)}>
              <View>
                <Text style={estilos.tituloJogo}>{item.nome}</Text>
                <Text style={estilos.subtitulo}>{item.descricao}</Text>
                <Text style={estilos.subtitulo}>Espaço: {item.espaco}</Text>
              </View>
            </Pressable>
          </View>
        ))}

      </ScrollView>
       </View>
  )
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
    gap: 10
  },

  pesquisa: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40
  },

  titulo: {
    color: '#060202',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 50
  },

  cartao: {
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center'
  },

  cartaoEspaco: {
    marginBottom: 100
  },

  imagem: {
    width: 118,
    height: 104,
    borderRadius: 5,
    marginRight: 5
  },

  tituloJogo: {
    fontSize: 20,
    fontWeight: 'bold'
  },

  subtitulo: {
    color: '#555'
  },

  link: {
    backgroundColor: '#29712b',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 15
  },

  textoLink: {
    color: '#fff',
    fontWeight: 'bold'
  }
});