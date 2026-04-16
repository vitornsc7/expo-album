import { Tabs } from 'expo-router';
import React from 'react';
import { House, Plus } from 'lucide-react-native';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { FeedProvider } from '@/contexts/feed-context';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <FeedProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: {
            borderTopWidth: 0.5,
            elevation: 0,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Feed',
            tabBarIcon: ({ color }) => <House size={26} color={color} strokeWidth={2.2} />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Novo Post',
            tabBarIcon: ({ color }) => <Plus size={26} color={color} strokeWidth={2.2} />,
          }}
        />
      </Tabs>
    </FeedProvider>
  );
}
