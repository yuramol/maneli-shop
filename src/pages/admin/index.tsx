import { AdminLayout } from '@/layouts/AdminLayout';
import { IconButton } from '@/legos/Button/IconButton';
import { getToken } from 'next-auth/jwt';
import { GetServerSideProps } from 'next/types';
import Image from 'next/legacy/image';
import Link from 'next/link';

import { Table, TableBody, TableCell, TableHead, TableRow } from '@/legos';
import { useProductsQuery } from '@/graphql/queries/__generated__/products';

const columns = ['ID', 'Фото', 'Назва', 'Ціна, грн.', 'Знижка, %', ''];
const rows = [
  { id: 1, photo: '', title: 'Портативна світлодіодна USB лампа', price: 270, discount: 40 },
  { id: 2, photo: '', title: 'USB лампа', price: 170, discount: 20 },
  { id: 3, photo: '', title: 'Світлодіодна USB лампа', price: 250, discount: 30 },
];

export default function AdminPage() {
  const { data, loading, error } = useProductsQuery();

  return (
    <AdminLayout>
      <section className="flex flex-col gap-8 my-8">
        <h1 className="font-bold text-3xl">Продукти</h1>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(col => (
                <TableCell key={col} head>
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.products?.data.map(({ id, attributes }) => (
              <TableRow key={id}>
                <TableCell>{id}</TableCell>
                <TableCell>
                  <Image
                    width={60}
                    height={60}
                    objectFit="cover"
                    alt="Product photo"
                    className="rounded-full overflow-hidden"
                    src={
                      process.env.BASE_URL +
                      attributes?.imagePreview?.data?.attributes?.formats.thumbnail.url
                    }
                  />
                </TableCell>
                <TableCell>{attributes?.title}</TableCell>
                <TableCell>{attributes?.price}</TableCell>
                <TableCell>{attributes?.discount}</TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-around">
                    <Link href={`admin/product/${id}`}>
                      <IconButton
                        icon="Edit"
                        className="flex justify-center items-center w-10 h-10 transition-all duration-100 hover:text-purple-700"
                      />
                    </Link>
                    <IconButton
                      icon="Delete"
                      className="flex justify-center items-center w-10 h-10 transition-all duration-100 hover:text-red-500"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
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
