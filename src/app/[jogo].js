import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db, initDb } from '../data/db';

initDb();

function getJogo(id) {
  return db.getFirstSync('SELECT * FROM jogos WHERE id = ?', [id]);
}

function deleteJogo(id) {
  db.runSync('DELETE FROM jogos WHERE id = ?', [id]);
}

export default function Jogo() {
  const { jogo } = useLocalSearchParams();
  const router = useRouter();
  const [likes, setLikes] = useState(0);
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    if (isNaN(jogo)) {
      // hardcoded game
      setGameData(null);
    } else {
      // registered game
      const data = getJogo(jogo);
      setGameData(data);
    }
  }, [jogo]);

  const handleEdit = () => {
    if (gameData) {
      router.push('/cadastro?editId=' + jogo);
    } else {
      Alert.alert('Atenção', 'Não é possível editar jogos padrão.');
    }
  };

  const handleDelete = () => {
    if (gameData) {
      Alert.alert('Excluir', `Remover "${gameData.nome}"?`, [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            deleteJogo(jogo);
            router.back();
          },
        },
      ]);
    } else {
      Alert.alert('Atenção', 'Não é possível excluir jogos padrão.');
    }
  };

  if (gameData) {
    // registered game
    return (
      <SafeAreaView style={estilos.container}>
        <View style={estilos.barraSuperior}>
          <Ionicons name="menu" size={28} />
          <Stack />
          <Text style={estilos.tituloBarra}>Informações</Text>
          <Ionicons name="settings-outline" size={24} />
          <Ionicons name="person-circle-outline" size={28} />
        </View>

        <ScrollView>
          <View style={estilos.cartaoGrande}>
            <View style={[estilos.imagemGrande, { backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }]}>
              <Text style={{ fontSize: 48, color: '#666' }}>?</Text>
            </View>

            <Text style={estilos.tituloJogoGrande}>{gameData.nome}</Text>

            <TouchableOpacity style={estilos.botao}>
              <Text style={estilos.textoBotao}>Jogar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setLikes(likes + 1)} style={estilos.likeButton}>
              <Text style={estilos.likeButtonText}>Gostei {likes}</Text>
            </TouchableOpacity>

            <Text style={estilos.info}>Descrição: {gameData.descricao}</Text>
            <Text style={estilos.info}>Espaço necessário: {gameData.espaco}</Text>

            <View style={estilos.acoes}>
              <TouchableOpacity onPress={handleEdit}>
                <Text style={estilos.editar}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete}>
                <Text style={estilos.excluir}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    // hardcoded game, for now only minecraft
    return (
      <SafeAreaView style={estilos.container}>
        <View style={estilos.barraSuperior}>
          <Ionicons name="menu" size={28} />
          <Stack />
          <Text style={estilos.tituloBarra}>Informações</Text>
          <Ionicons name="settings-outline" size={24} />
          <Ionicons name="person-circle-outline" size={28} />
        </View>

        <ScrollView>
          <View style={estilos.cartaoGrande}>
            <Image source={require('./minecraft.jpg')} style={estilos.imagemGrande} />

            <Text style={estilos.tituloJogoGrande}>Minecraft</Text>

            <TouchableOpacity style={estilos.botao}>
              <Text style={estilos.textoBotao}>Jogar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setLikes(likes + 1)} style={estilos.likeButton}>
              <Text style={estilos.likeButtonText}>Gostei {likes}</Text>
            </TouchableOpacity>

            <Text style={estilos.info}>Espaço necessário: 49,95 gb</Text>

            <View style={estilos.acoes}>
              <TouchableOpacity onPress={handleEdit}>
                <Text style={estilos.editar}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete}>
                <Text style={estilos.excluir}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6D6565',
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  barraSuperior: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tituloBarra: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#060202',
  },
  cartaoGrande: {
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  imagemGrande: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  tituloJogoGrande: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  botao: {
    backgroundColor: '#29712b',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 40,
    marginBottom: 10,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  likeButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  likeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  info: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
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
  },
});