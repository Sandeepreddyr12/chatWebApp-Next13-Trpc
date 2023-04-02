// eslint-disable-next-line consistent-return
import { v4 as uuidv4 } from 'uuid';

export default function userId(): string {
  if (typeof window !== 'undefined') {
    let myChatId = localStorage.getItem('myChatId');
    if (!myChatId) {
      const uniqueId = uuidv4();
      localStorage.setItem('myChatId', uniqueId);
      myChatId = localStorage.getItem('myChatId') as string;
    }
    return myChatId;
  }
}
