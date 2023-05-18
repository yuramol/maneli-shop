import { getSession } from 'next-auth/react';

export const getAccessToken = async () => {
  const session: any = await getSession();
  return session?.accessToken;
};
