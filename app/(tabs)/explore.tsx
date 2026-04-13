import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function NewPostScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const bgColor = isDark ? '#000000' : '#fafafa';
  const headerBg = isDark ? '#000000' : '#ffffff';
  const headerBorder = isDark ? '#222222' : '#dbdbdb';
  const headerText = isDark ? '#ffffff' : '#000000';
  const cardBg = isDark ? '#1e1e1e' : '#ffffff';
  const cardBorder = isDark ? '#2c2c2c' : '#efefef';
  const textColor = isDark ? '#f0f0f0' : '#111111';
  const subColor = isDark ? '#888888' : '#8e8e8e';
  const iconBg = isDark ? '#2c2c2c' : '#f0f0f0';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: headerBg, borderBottomColor: headerBorder }]}>
        <Text style={[styles.headerTitle, { color: headerText }]}>Novo Post</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={[styles.sectionLabel, { color: subColor }]}>
          Monte seu feed
        </Text>

        <TextInput
          style={[styles.input, { backgroundColor: cardBg, borderColor: cardBorder }]}
          placeholder="Adicione uma descrição..."
          placeholderTextColor={subColor}
        />

        {/* Import from gallery */}
        <TouchableOpacity
          style={[styles.optionCard, { backgroundColor: cardBg, borderColor: cardBorder }]}
          activeOpacity={0.7}
        >
          <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
            <Text style={styles.iconEmoji}>🖼️</Text>
          </View>
          <View style={styles.optionInfo}>
            <Text style={[styles.optionTitle, { color: textColor }]}>Importar da galeria</Text>
            <Text style={[styles.optionSubtitle, { color: subColor }]}>
              Escolha uma foto do seu dispositivo
            </Text>
          </View>
          <Text style={[styles.chevron, { color: subColor }]}>›</Text>
        </TouchableOpacity>

        {/* Take photo */}
        <TouchableOpacity
          style={[styles.optionCard, { backgroundColor: cardBg, borderColor: cardBorder }]}
          activeOpacity={0.7}
        >
          <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
            <Text style={styles.iconEmoji}>📷</Text>
          </View>
          <View style={styles.optionInfo}>
            <Text style={[styles.optionTitle, { color: textColor }]}>Tirar foto</Text>
            <Text style={[styles.optionSubtitle, { color: subColor }]}>
              Use a câmera para capturar um momento
            </Text>
          </View>
          <Text style={[styles.chevron, { color: subColor }]}>›</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
          <View>
            <Text>Imagem carregada</Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#ffffff',
              borderColor: '#dbdbdb',
              borderWidth: 0.5,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 8,
            }}
            activeOpacity={0.8}
          >
            <Text style={{ color: '#000000', fontSize: 14 }}>Publicar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 28,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 14,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 0.5,
    padding: 16,
    marginBottom: 12,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: 26,
  },
  optionInfo: {
    flex: 1,
    marginLeft: 14,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
  },
  optionSubtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  chevron: {
    fontSize: 24,
    fontWeight: '300',
    marginLeft: 8,
  },
  input: {
    borderWidth: 0.5,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 10,
  },
});
