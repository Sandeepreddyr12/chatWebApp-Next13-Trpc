// eslint-disable-next-line consistent-return
export default function userId(): string {
  if (typeof window !== 'undefined') {
    let myChatId = localStorage.getItem('myChatId');
    if (!myChatId) {
      const uniqueId = `${Math.random().toString(36)}0000000000000`.slice(
        2,
        15
      );
      localStorage.setItem('myChatId', uniqueId);
      myChatId = localStorage.getItem('myChatId') as string;
    }
    return myChatId;
  }
}
