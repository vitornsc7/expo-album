import { Tabs } from 'expo-router';
import { House, Plus } from 'lucide-react-native';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { FeedProvider } from '@/contexts/feed-context';

export default function TabLayout() {
  return (
    <FeedProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#0a7ea4',
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
