import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Camera, ChevronRight, FlipHorizontal, ImagePlus, X } from 'lucide-react-native';
import React, { useMemo, useRef, useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useFeed } from '@/contexts/feed-context';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NewPostScreen() {
  const router = useRouter();
  const { addPost } = useFeed();
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [facing, setFacing] = useState<CameraType>('back');
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const canPublish = useMemo(
    () => description.trim().length > 0 && Boolean(imageUri),
    [description, imageUri]
  );

  async function pickFromGallery() {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permissão necessária', 'Autorize o acesso à galeria para selecionar uma foto.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri);
    }
  }

  async function openCamera() {
    if (!cameraPermission?.granted) {
      const result = await requestCameraPermission();
      if (!result.granted) {
        Alert.alert('Permissão necessária', 'Autorize o acesso à câmera para tirar uma foto.');
        return;
      }
    }
    setCameraOpen(true);
  }

  async function takePicture() {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync();
    if (photo?.uri) {
      setImageUri(photo.uri);
    }
    setCameraOpen(false);
  }

  function toggleFacing() {
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
  }

  function publish() {
    if (!canPublish || !imageUri) {
      return;
    }

    addPost({
      id: `${Date.now()}`,
      description: description.trim(),
      imageUri,
    });

    setDescription('');
    setImageUri(null);
    router.navigate('/(tabs)');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Novo Post</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.panel}>
          <Text style={styles.sectionLabel}>MONTE SEU FEED</Text>

          <TextInput
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            placeholder="Adicione uma descrição..."
            placeholderTextColor="#94a3b8"
            multiline
            textAlignVertical="top"
          />

          <TouchableOpacity style={styles.optionCard} onPress={pickFromGallery} activeOpacity={0.8}>
            <View style={[styles.iconBox, { backgroundColor: '#dbeafe' }]}>
              <ImagePlus size={24} color="#2563eb" strokeWidth={2.2} />
            </View>
            <View style={styles.optionInfo}>
              <Text style={styles.optionTitle}>Importar da galeria</Text>
              <Text style={styles.optionSubtitle}>Escolha uma foto do seu dispositivo</Text>
            </View>
            <ChevronRight size={24} color="#94a3b8" strokeWidth={2.4} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionCard} onPress={openCamera} activeOpacity={0.8}>
            <View style={[styles.iconBox, { backgroundColor: '#f3e8ff' }]}>
              <Camera size={24} color="#9333ea" strokeWidth={2.2} />
            </View>
            <View style={styles.optionInfo}>
              <Text style={styles.optionTitle}>Tirar foto</Text>
              <Text style={styles.optionSubtitle}>Use a câmera para capturar um momento</Text>
            </View>
            <ChevronRight size={24} color="#94a3b8" strokeWidth={2.4} />
          </TouchableOpacity>

          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.imagePreview} resizeMode="cover" />
          ) : (
            <Text style={styles.imageStatus}>Nenhuma imagem selecionada</Text>
          )}

          <TouchableOpacity
            style={[styles.publishButton, !canPublish && styles.publishButtonDisabled]}
            onPress={publish}
            disabled={!canPublish}
            activeOpacity={0.9}>
            <Text style={styles.publishText}>Publicar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={cameraOpen} animationType="slide" onRequestClose={() => setCameraOpen(false)}>
        <View style={styles.cameraContainer}>
          <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
          <View style={styles.cameraControls}>
            <TouchableOpacity style={styles.cameraActionButton} onPress={() => setCameraOpen(false)}>
              <X size={28} color="#ffffff" strokeWidth={2.2} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraActionButton} onPress={toggleFacing}>
              <FlipHorizontal size={28} color="#ffffff" strokeWidth={2.2} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -1,
    color: '#020617',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  panel: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 2,
    padding: 18,
  },
  sectionLabel: {
    color: '#475569',
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 1.3,
    marginBottom: 16,
  },
  input: {
    height: 140,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    fontSize: 18,
    color: '#334155',
    marginBottom: 18,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 16,
    marginBottom: 14,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionInfo: {
    flex: 1,
    marginLeft: 14,
  },
  optionTitle: {
    color: '#0f172a',
    fontSize: 20,
    fontWeight: '600',
  },
  optionSubtitle: {
    color: '#64748b',
    fontSize: 13,
    marginTop: 2,
  },
  imageStatus: {
    color: '#64748b',
    fontSize: 16,
    marginTop: 4,
  },
  imagePreview: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    marginTop: 4,
    backgroundColor: '#e5e7eb',
  },
  publishButton: {
    marginTop: 18,
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  publishButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  publishText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    position: 'absolute',
    bottom: 48,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  cameraActionButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffffff',
  },
});
