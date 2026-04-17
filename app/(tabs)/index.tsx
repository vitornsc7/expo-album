import React from 'react';
import {
  Image,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFeed } from '@/contexts/feed-context';

function PostCard({ imageUri, description }: { imageUri: string; description: string }) {

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
      <Text style={styles.postText}>{description}</Text>
    </View>
  );
}

export default function FeedScreen() {
  const { posts } = useFeed();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Feed</Text>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard imageUri={item.imageUri} description={item.description} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Nenhum post publicado ainda.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    color: '#0f172a',
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -1,
  },
  list: {
    paddingTop: 12,
    paddingBottom: 24,
  },
  card: {
    marginHorizontal: 10,
    marginVertical: 8,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  image: {
    width: '100%',
    height: 260,
    backgroundColor: '#e5e7eb',
  },
  postText: {
    paddingHorizontal: 18,
    paddingVertical: 18,
    fontSize: 16,
    lineHeight: 28,
    color: '#334155',
  },
  emptyState: {
    marginTop: 36,
    alignItems: 'center',
  },
  emptyText: {
    color: '#64748b',
    fontSize: 18,
  },
});
