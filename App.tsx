import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useMessaging } from 'src/services/firebase/useMessaging';
import { requestUserPermission } from './src/services/firebase/messaging';
import { InfoAndCopy } from 'src/components/InfoAndCopy';

export default function App() {
  const { resetMessages, token, messages } = useMessaging();

  useEffect(() => {
    requestUserPermission();
  }, []);

  const FcmInfos = useCallback(
    () => (
      <View style={styles.headerContainer}>
        <InfoAndCopy
          label="Token"
          value={token}
          ignoreDivider
        />
      </View>
    ),
    [token]
  );

  const MessageManager = useCallback(
    () => (
      <View style={styles.headerContainer}>
        <Button
          onPress={resetMessages}
          title="Clear messages"
        />
        <Text style={styles.boldText}>
          Stored Messages: {messages?.length ?? 0}
        </Text>
      </View>
    ),
    [messages]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      const jsonItem = JSON.parse(item);
      const timestamp = new Date(jsonItem.sentTime).toISOString();

      const label = timestamp ?? `${index}.`;

      return (
        <InfoAndCopy
          label={label}
          value={item}
        />
      );
    },
    []
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />

        <Text style={styles.h1}>FCM Tester</Text>

        <FcmInfos />
        <MessageManager />

        <FlatList
          contentContainerStyle={styles.flContentStyle}
          style={{ width: '100%' }}
          data={messages}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  headerContainer: {
    width: '100%',
    padding: 8,

    justifyContent: 'center',
    alignItems: 'center',

    gap: 8,

    borderBottomWidth: 1,
    borderBottomColor: '#202020',
  },
  boldText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  flContentStyle: {
    paddingTop: 8,
    paddingHorizontal: 8,
  },
});
