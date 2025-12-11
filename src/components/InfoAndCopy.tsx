import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { CopyToClipboard } from './CopyToClipboard';

type InfoAndCopyProps = {
  label: string;
  value: string;
  ignoreDivider?: boolean;
};

export function InfoAndCopy({
  label,
  value,
  ignoreDivider = false,
}: InfoAndCopyProps) {
  const auxStyle: ViewStyle = {
    borderBottomColor: '#202020',
    borderBottomWidth: ignoreDivider ? 0 : 0.5,
    marginBottom: ignoreDivider ? 0 : 8,
  };

  return (
    <View style={[styles.container, auxStyle]}>
      <View style={styles.columnGroup}>
        <Text style={styles.boldText}>{label}</Text>
        <Text style={styles.itemText}>{value}</Text>
      </View>

      <CopyToClipboard msgToCopy={value} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 8,
  },
  columnGroup: {
    flexShrink: 1,
    gap: 4,
  },
  boldText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: 16,
  },
});
