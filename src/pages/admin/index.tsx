import { AdminLayout } from '@/layouts/AdminLayout';
import { IconButton } from '@/legos/Button/IconButton';
import { getToken } from 'next-auth/jwt';
import { GetServerSideProps } from 'next/types';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <AdminLayout>
      <section className="flex flex-col gap-8 my-8">
        <h1 className="font-bold text-3xl">Продукти</h1>
        <div className="border rounded-md">
          <table className="w-full whitespace-nowrap border-collapse border-spacing-0">
            <thead className="border-b">
              <tr className="border-b">
                <th className="p-4 text-center">ID</th>
                <th className="p-4 text-center">Назва</th>
                <th className="p-4 text-center">Ціна, грн.</th>
                <th className="p-4 text-center">Знижка, %</th>
                <th className="p-4 text-center"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b last-of-type:border-none">
                <td className="p-4 text-center">1</td>
                <td className="p-4 text-center">Портативна світлодіодна USB лампа</td>
                <td className="p-4 text-center">270</td>
                <td className="p-4 text-center">40</td>
                <td className="p-4 text-center">
                  <div className="flex gap-2 justify-around">
                    <Link href={`admin/product/1`}>
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
                </td>
              </tr>
              <tr className="border-b last-of-type:border-none">
                <td className="p-4 text-center">2</td>
                <td className="p-4 text-center">Портативна світлодіодна USB лампа</td>
                <td className="p-4 text-center">340</td>
                <td className="p-4 text-center">40</td>
                <td className="p-4 text-center">
                  <div className="flex gap-2 justify-around">
                    <Link href={`admin/product/2`}>
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
                </td>
              </tr>
              <tr className="border-b last-of-type:border-none">
                <td className="p-4 text-center">3</td>
                <td className="p-4 text-center">Портативна світлодіодна USB лампа</td>
                <td className="p-4 text-center">340</td>
                <td className="p-4 text-center">40</td>
                <td className="p-4 text-center">
                  <div className="flex gap-2 justify-around">
                    <Link href={`admin/product/3`}>
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
                </td>
              </tr>
              <tr className="border-b last-of-type:border-none">
                <td className="p-4 text-center">4</td>
                <td className="p-4 text-center">Портативна світлодіодна USB лампа</td>
                <td className="p-4 text-center">340</td>
                <td className="p-4 text-center">40</td>
                <td className="p-4 text-center">
                  <div className="flex gap-2 justify-around">
                    <Link href={`admin/product/4`}>
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
                </td>
              </tr>
              <tr className="border-b last-of-type:border-none">
                <td className="p-4 text-center">5</td>
                <td className="p-4 text-center">Портативна світлодіодна USB лампа</td>
                <td className="p-4 text-center">340</td>
                <td className="p-4 text-center">40</td>
                <td className="p-4 text-center">
                  <div className="flex gap-2 justify-around">
                    <Link href={`admin/product/5`}>
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
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
