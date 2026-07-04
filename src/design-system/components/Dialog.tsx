import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../tokens';

export interface DialogProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export function Dialog({ open, onClose, title, children, actions }: DialogProps) {
  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.scrim} onPress={onClose}>
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          {title ? <Text style={[theme.type.displaySm, { color: theme.color.ink800 }]}>{title}</Text> : null}
          <View style={styles.body}>
            {typeof children === 'string' ? (
              <Text style={[theme.type.bodyMd, { color: theme.color.ink600 }]}>{children}</Text>
            ) : (
              children
            )}
          </View>
          {actions ? <View style={styles.actions}>{actions}</View> : null}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrim: {
    flex: 1,
    backgroundColor: theme.color.scrim,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.space[6],
  },
  card: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: theme.color.surface,
    borderRadius: theme.radius.xl,
    padding: theme.space[6],
    gap: 16,
    ...theme.shadowFloat,
  },
  body: { gap: 8 },
  actions: { flexDirection: 'row', gap: 10, marginTop: 4 },
});
