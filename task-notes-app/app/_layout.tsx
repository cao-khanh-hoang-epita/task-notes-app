// app/_layout.tsx
import React from 'react';
import { Slot } from 'expo-router';
import { TaskProvider } from '../contexts/TaskContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
     <TaskProvider>
       <Slot />
     </TaskProvider>
   </GestureHandlerRootView>
  );
}