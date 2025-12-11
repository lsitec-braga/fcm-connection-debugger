import {
  getMessaging,
  getToken,
  onMessage,
} from '@react-native-firebase/messaging';
import { useEffect, useState } from 'react';
import { useMMKVObject } from 'react-native-mmkv';
import MessageStorage, { MESSAGE_STORE_ID } from '../mmkv/MessageStorage';

export function useMessaging() {
  const messaging = getMessaging();
  const [messages, setMessages] = useMMKVObject<string[]>(MESSAGE_STORE_ID);
  const [token, setToken] = useState('');

  const resetMessages = () => {
    setMessages([]);
    MessageStorage.clear();
  };

  const checkToken = async () => {
    const currToken = await getToken(messaging);
    setToken(currToken);
  };

  useEffect(() => {
    checkToken();
    const unsubOnMessage = onMessage(messaging, async (remoteMessage) => {
      const strMessage = JSON.stringify(remoteMessage);

      setMessages((prev) => {
        if (!prev) return [strMessage];

        return [strMessage, ...prev];
      });
      MessageStorage.add(strMessage);
    });

    return () => {
      unsubOnMessage();
    };
  }, []);

  return {
    token,
    messages,
    resetMessages,
  };
}
