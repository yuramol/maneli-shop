import { CatalogPageContainer } from '@/components';
import { ComponentContainer, MainLayout } from '@/layouts';
import { getToken } from 'next-auth/jwt';

export default function Home() {
  return (
    <MainLayout>
      <ComponentContainer>
        <CatalogPageContainer />
      </ComponentContainer>
    </MainLayout>
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
