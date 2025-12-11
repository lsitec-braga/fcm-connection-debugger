import { MaterialIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { TouchableOpacity } from 'react-native';

export function CopyToClipboard({ msgToCopy }: { msgToCopy: string }) {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(msgToCopy);
  };

  return (
    <TouchableOpacity onPress={copyToClipboard}>
      <MaterialIcons
        name="content-copy"
        size={24}
      />
    </TouchableOpacity>
  );
}
