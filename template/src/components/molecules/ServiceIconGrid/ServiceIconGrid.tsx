/**
 * ServiceIconGrid Component
 * Grid of quick action service icons for the home screen
 */

import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@/theme';
import type { Colors } from '@/theme/types/colors';

export interface ServiceItem {
  id: string;
  icon: string;
  label: string;
  color?: string;
}

export interface ServiceIconGridProps {
  services: ServiceItem[];
  onServicePress: (serviceId: string) => void;
  columns?: number;
}

const DEFAULT_SERVICES: ServiceItem[] = [
  { id: 'maintenance', icon: 'build', label: 'Servicio' },
  { id: 'insurance', icon: 'verified-user', label: 'Seguro' },
  { id: 'financing', icon: 'account-balance', label: 'Financiamiento' },
  { id: 'roadside', icon: 'local-shipping', label: 'Asistencia' },
  { id: 'parts', icon: 'settings', label: 'Refacciones' },
  { id: 'support', icon: 'headset-mic', label: 'Soporte' },
];

export const ServiceIconGrid: React.FC<ServiceIconGridProps> = ({
  services = DEFAULT_SERVICES,
  onServicePress,
  columns = 3,
}) => {
  const { colors, shadows } = useTheme();
  const styles = useMemo(() => createStyles(colors, columns), [colors, columns]);

  return (
    <View style={styles.container}>
      {services.map((service) => (
        <TouchableOpacity
          key={service.id}
          style={styles.item}
          onPress={() => onServicePress(service.id)}
          activeOpacity={0.7}
        >
          <View style={[styles.iconContainer, shadows.soft]}>
            <MaterialIcons
              name={service.icon}
              size={24}
              color={service.color || colors.primary}
            />
          </View>
          <Text style={styles.label} numberOfLines={1}>
            {service.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const createStyles = (colors: Colors, columns: number) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 16,
      gap: 12,
    },
    item: {
      width: `${(100 / columns) - 3}%`,
      alignItems: 'center',
      gap: 8,
    },
    iconContainer: {
      width: 56,
      height: 56,
      borderRadius: 16,
      backgroundColor: colors.glassBg,
      borderWidth: 1,
      borderColor: colors.glassBorder,
      justifyContent: 'center',
      alignItems: 'center',
    },
    label: {
      fontSize: 12,
      fontWeight: '500',
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });

export default ServiceIconGrid;
