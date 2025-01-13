// components/ProfileScreenLayout.tsx
import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ProfileScreenLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const ProfileScreenLayout: React.FC<ProfileScreenLayoutProps> = ({
  children,
  header,
  footer,
}) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {header}
      <ScrollView className="flex-1">
        {children}
      </ScrollView>
      {footer}
    </SafeAreaView>
  );
};