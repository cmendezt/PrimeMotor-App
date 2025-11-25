/**
 * SearchBar Component
 * Search input for motorcycles with glass effect styling
 */

import React, { useMemo } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@/theme';
import type { Colors } from '@/theme/types/colors';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Buscar motocicletas...',
}) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const handleClear = () => {
    onChangeText('');
  };

  return (
    <View style={styles.container}>
      <MaterialIcons name="search" size={22} color={colors.textSecondary} style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textPlaceholder}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <MaterialIcons name="close" size={18} color={colors.textMuted} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.glassBg,
      borderRadius: 12,
      paddingHorizontal: 16,
      height: 50,
      borderWidth: 1,
      borderColor: colors.glassBorder,
    },
    icon: {
      marginRight: 12,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: colors.textPrimary,
      paddingVertical: 0,
    },
    clearButton: {
      padding: 4,
    },
  });
