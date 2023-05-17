import { ComponentContainer } from '@/layouts';
import { AdminLayout } from '@/layouts/AdminLayout';
import { getToken } from 'next-auth/jwt';
import { GetServerSideProps } from 'next/types';

export default function AdminPage() {
  return (
    <AdminLayout>
      <ComponentContainer>Container</ComponentContainer>
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
