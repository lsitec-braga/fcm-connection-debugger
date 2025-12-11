import { createMMKV } from 'react-native-mmkv';

export const MESSAGE_STORE_ID = '@msg';

const messageStore = createMMKV({
  id: MESSAGE_STORE_ID,
});

export default class MessageStorage {
  static get() {
    const messages = messageStore.getString(MESSAGE_STORE_ID);

    return JSON.parse(messages ?? '[]');
  }

  static clear() {
    messageStore.remove(MESSAGE_STORE_ID);
  }

  static add(message: string) {
    const messages = this.get();

    const newMessages = [message, ...messages];

    const strMessage = JSON.stringify(newMessages);

    messageStore.set(MESSAGE_STORE_ID, strMessage);
  }
}
