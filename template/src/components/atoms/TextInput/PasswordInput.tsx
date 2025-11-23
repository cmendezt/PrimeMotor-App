import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { TextInput, type TextInputProps } from './TextInput';
import { useTheme } from '@/theme';

export type PasswordInputProps = Omit<TextInputProps, 'secureTextEntry' | 'rightIcon'>;

export const PasswordInput = React.forwardRef<any, PasswordInputProps>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const { colors } = useTheme();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextInput
      ref={ref}
      {...props}
      secureTextEntry={!showPassword}
      rightIcon={
        <TouchableOpacity onPress={togglePasswordVisibility} activeOpacity={0.7}>
          <Text style={{ color: colors.textMuted, fontSize: 20 }}>
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </Text>
        </TouchableOpacity>
      }
    />
  );
});

PasswordInput.displayName = 'PasswordInput';
