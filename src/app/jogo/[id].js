import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db, initDb } from '../../data/db';

initDb();

function getJogo(id) {
  return db.getFirstSync('SELECT * FROM jogos WHERE id = ?', [id]);
}

function deleteJogo(id) {
  db.runSync('DELETE FROM jogos WHERE id = ?', [id]);
}

function updateJogo(id, nome, descricao, espaco) {
  db.runSync('UPDATE jogos SET nome = ?, descricao = ?, espaco = ? WHERE id = ?', [nome, descricao, espaco, id]);
}

const staticGames = {
  minecraft: {
    nome: 'Minecraft',
    descricao: 'Construção em mundo aberto',
    espaco: '49,95 gb',
    imagem: require('../minecraft.jpg'),
  },
  roblox: {
    nome: 'Roblox',
    descricao: 'Universo virtual',
    espaco: '10 gb',
    imagem: require('../roblox.jpg'),
  },
  gta5: {
    nome: 'Grand Theft Auto V',
    descricao: 'Mundo aberto',
    espaco: '72 gb',
    imagem: require('../gta5.jpg'),
  },
  fortnite: {
    nome: 'Fortnite',
    descricao: 'Battle Royale',
    espaco: '45 gb',
    imagem: require('../fortnite.jpg'),
  },
};

export default function JogoInfo() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [likes, setLikes] = useState(0);
  const [gameData, setGameData] = useState(null);
  const [staticGame, setStaticGame] = useState(null);

  useEffect(() => {
    if (!id) {
      setGameData(null);
      setStaticGame(null);
      return;
    }

    if (staticGames[id]) {
      setStaticGame(staticGames[id]);
      setGameData(null);
    } else if (!isNaN(Number(id))) {
      const data = getJogo(id);
      setGameData(data);
      setStaticGame(null);
    } else {
      setStaticGame(null);
      setGameData(null);
    }
  }, [id]);

  const handleEdit = () => {
    if (gameData) {
      router.push(`/cadastro?editId=${id}`);
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
            deleteJogo(id);
            router.back();
          },
        },
      ]);
    } else {
      Alert.alert('Atenção', 'Não é possível excluir jogos padrão.');
    }
  };

  const info = gameData || staticGame;

  if (!info) {
    return (
      <SafeAreaView style={estilos.container}>
        <View style={estilos.barraSuperior}>
          <Ionicons name="menu" size={28} />
          <Stack />
          <Text style={estilos.tituloBarra}>Informações</Text>
          <Ionicons name="settings-outline" size={24} />
          <Ionicons name="person-circle-outline" size={28} />
        </View>
        <View style={estilos.cartaoGrande}>
          <Text style={estilos.tituloJogoGrande}>Jogo não encontrado</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.barraSuperior}>
        <Ionicons name="arrow-back" size={28} color="#fff" onPress={() => router.back()} />
        <Text style={estilos.tituloBarra}>Informações</Text>
        <View style={estilos.topIcons}>
          <Ionicons name="settings-outline" size={24} color="#fff" />
          <Ionicons name="person-circle-outline" size={28} color="#fff" />
        </View>
      </View>

      <ScrollView contentContainerStyle={estilos.scrollContent}>
        <View style={estilos.cardHeader}>
          {staticGame ? (
            <Image source={info.imagem} style={estilos.imagemGrande} />
          ) : (
            <View style={[estilos.imagemGrande, estilos.placeholderImage]}>
              <Text style={estilos.placeholderText}>?</Text>
            </View>
          )}

          <Text style={estilos.tituloJogoGrande}>{info.nome}</Text>
          <Text style={estilos.subtituloInfo}>{info.descricao}</Text>
        </View>

        <View style={estilos.detalhesCard}>
          <View style={estilos.detalheRow}>
            <Text style={estilos.detalheLabel}>Descrição</Text>
            <Text style={estilos.detalheValue}>{info.descricao}</Text>
          </View>
          <View style={estilos.detalheRow}>
            <Text style={estilos.detalheLabel}>Espaço necessário</Text>
            <Text style={estilos.detalheValue}>{info.espaco}</Text>
          </View>
        </View>

        <View style={estilos.actionsRow}>
          <TouchableOpacity style={estilos.primaryButton}>
            <Text style={estilos.primaryButtonText}>Jogar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.secondaryButton} onPress={() => setLikes(likes + 1)}>
            <Text style={estilos.secondaryButtonText}>Gostei {likes}</Text>
          </TouchableOpacity>
        </View>

        <View style={estilos.acoes}> 
          <TouchableOpacity onPress={handleEdit} style={estilos.linkButton}>
            <Text style={estilos.editar}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={estilos.linkButton}>
            <Text style={estilos.excluir}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
    marginBottom: 0,
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginHorizontal: -15,
    marginTop: -50,
    paddingTop: 50,
  },
  topIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  tituloBarra: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  cardHeader: {
    backgroundColor: '#D9D9D9',
    borderRadius: 0,
    padding: 20,
    alignItems: 'center',
    marginBottom: 0,
  },
  imagemGrande: {
    width: 220,
    height: 220,
    borderRadius: 24,
    marginBottom: 20,
  },
  placeholderImage: {
    backgroundColor: '#3e425f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 56,
    color: '#9ca3af',
  },

  tituloJogoGrande: {
    fontSize: 30,
    fontWeight: '800',
    color: '#060202',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtituloInfo: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 18,
    paddingHorizontal: 10,
  },
  detalhesCard: {
    backgroundColor: '#D9D9D9',
    borderRadius: 0,
    padding: 20,
    marginBottom: 0,
  },
  detalheRow: {
    marginBottom: 16,
  },
  detalheLabel: {
    color: '#555',
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 6,
  },
  detalheValue: {
    color: '#060202',
    fontSize: 17,
    lineHeight: 24,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 0,
    backgroundColor: '#D9D9D9',
    padding: 20,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#29712b',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#bdbdbd',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#060202',
    fontSize: 16,
    fontWeight: '700',
  },
  acoes: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    backgroundColor: '#D9D9D9',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  linkButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  editar: {
    color: '#a78bfa',
    fontWeight: '700',
    fontSize: 16,
  },
  excluir: {
    color: '#fda4af',
    fontWeight: '700',
    fontSize: 16,
  },
});