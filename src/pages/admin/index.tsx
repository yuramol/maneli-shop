import { CatalogPageContainer } from '@/components';
import { ComponentContainer } from '@/layouts';
import { AdminLayout } from '@/layouts/AdminLayout';
import { getToken } from 'next-auth/jwt';

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
