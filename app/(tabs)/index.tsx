import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const POSTS = [
  {
    id: '1',
    text: 'Primeiro post',
  },
  {
    id: '2',
    text: 'Caverna',
  },
  {
    id: '3',
    text: 'Natureza',
  },
  {
    id: '4',
    text: 'Volta na cidade',
  },
  {
    id: '5',
    text: 'Novo projeto',
  },
];

type Post = (typeof POSTS)[number];

function PostCard({ post, isDark }: { post: Post; isDark: boolean }) {
  const bg = isDark ? '#1e1e1e' : '#ffffff';
  const border = isDark ? '#2c2c2c' : '#efefef';
  const textColor = isDark ? '#f0f0f0' : '#111111';
  const subColor = isDark ? '#888888' : '#8e8e8e';

  return (
    <View style={[styles.card, { backgroundColor: bg, borderColor: border }]}>
      <View>
        <Text style={[styles.postText, { color: textColor }]}>{post.text}</Text>
      </View>
    </View>
  );
}

export default function FeedScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const bgColor = isDark ? '#000000' : '#fafafa';
  const headerBg = isDark ? '#000000' : '#ffffff';
  const headerBorder = isDark ? '#222222' : '#dbdbdb';
  const headerText = isDark ? '#ffffff' : '#000000';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <FlatList
        data={POSTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} isDark={isDark} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  card: {
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 0.5,
    overflow: 'hidden',
  },
  postText: {
    fontSize: 15,
    lineHeight: 22,
  },
});
