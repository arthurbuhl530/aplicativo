import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, Pressable, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db, initDb } from '../data/db';

initDb();

function getJogo(id) {
  return db.getFirstSync('SELECT * FROM jogos WHERE id = ?', [id]);
}

function insertJogo(nome, descricao, espaco) {
  db.runSync('INSERT INTO jogos (nome, descricao, espaco) VALUES (?, ?, ?)', [nome, descricao, espaco]);
}

function updateJogo(id, nome, descricao, espaco) {
  db.runSync('UPDATE jogos SET nome = ?, descricao = ?, espaco = ? WHERE id = ?', [nome, descricao, espaco, id]);
}

export default function CadastroScreen() {
  const { editId } = useLocalSearchParams();
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [espaco, setEspaco] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (editId) {
      const jogo = getJogo(editId);
      if (jogo) {
        setNome(jogo.nome);
        setDescricao(jogo.descricao);
        setEspaco(jogo.espaco);
        setIsEditing(true);
        setEditingId(editId);
      }
    }
  }, [editId]);

  function salvar() {
    if (!nome.trim() || !descricao.trim() || !espaco.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    if (isEditing && editingId) {
      updateJogo(editingId, nome.trim(), descricao.trim(), espaco.trim());
      setIsEditing(false);
      setEditingId(null);
    } else {
      insertJogo(nome.trim(), descricao.trim(), espaco.trim());
    }

    setNome('');
    setDescricao('');
    setEspaco('');
  }

  return (
    <SafeAreaView style={estilos.container}>
      <Stack />

      <View style={estilos.barraSuperior}>
        <Ionicons name="menu" size={28} />
        <Text style={estilos.tituloBarra}>Cadastro</Text>
        <Ionicons name="settings-outline" size={24} />
        <Ionicons name="person-circle-outline" size={28} />
      </View>

      <ScrollView>
        <View style={estilos.cartao}>
          <Text style={estilos.label}>Nome do Jogo</Text>
          <TextInput
            style={estilos.input}
            placeholder=""
            placeholderTextColor="#555"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={estilos.label}>Descrição do jogo</Text>
          <TextInput
            style={estilos.input}
            placeholder=""
            placeholderTextColor="#555"
            value={descricao}
            onChangeText={setDescricao}
            multiline
          />

          <Text style={estilos.label}>Espaço Necessário</Text>
          <TextInput
            style={estilos.input}
            placeholder=""
            placeholderTextColor="#555"
            value={espaco}
            onChangeText={setEspaco}
          />

          <Pressable style={estilos.botao} onPress={salvar}>
            <Text style={estilos.botaoTexto}>{isEditing ? 'Atualizar' : 'Salvar'}</Text>
          </Pressable>
          {isEditing && (
            <Pressable
              style={[estilos.botao, { backgroundColor: '#888' }]}
              onPress={() => {
                setIsEditing(false);
                setEditingId(null);
                setNome('');
                setDescricao('');
                setEspaco('');
              }}
            >
              <Text style={estilos.botaoTexto}>Cancelar</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>

      <Link href="/" style={estilos.link}>
        <Text style={estilos.textoLink}>Voltar</Text>
      </Link>
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
  },
  tituloBarra: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#060202',
  },
  cartao: {
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    padding: 15,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  botao: {
    backgroundColor: '#29712b',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  link: {
    backgroundColor: '#29712b',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 15,
    marginLeft: 15,
  },
  textoLink: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
