import { z } from 'zod';
import { errors } from '@strapi/utils/lib';

import { CreateOrderResolverArg } from './type';
import axios from 'axios';

const createOrderMutationInputSchema = z.object({
  productId: z.string(),
  productModification: z.string(),
  quantity: z.number(),
  userName: z.string(),
  userPhone: z.string(),
});

export const createOrderResolver = async (
  parent,
  args: CreateOrderResolverArg
) => {
  const validation = createOrderMutationInputSchema.safeParse(
    args.data
  );
  if (validation.success === false) {
    throw validation.error;
  }
  const {
    data: {
      productId,
      productModification,
      quantity = 1,
      userName,
      userPhone,
    },
  } = validation;
  const product = await strapi.entityService.findOne(
    'api::product.product',
    productId,
    {
      populate: '*',
    }
  );

  if (!product) {
    throw new errors.ValidationError('productId not found');
  }

  const baseUrl = strapi.config.get('crm.url');
  const sourceId = strapi.config.get('crm.sourceId');
  const token = strapi.config.get('crm.token');
  const appUrl = strapi.config.get('server.url');
  const dataOrderCreate = {
    source_id: sourceId,
    buyer: {
      full_name: userName,
      phone: userPhone,
    },
    products: [
      {
        sku: product.sku,
        price: product.price,
        quantity: quantity,
        name: product.title,
        comment: productModification,
        picture: `${appUrl}${product.imagePreview.url}`,
      },
    ],
  };

  return axios
    .post(`${baseUrl}/order`, dataOrderCreate, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      return {
        status: true,
        message: 'Success',
      };
    })
    .catch((error) => {
      return {
        status: false,
        message: error.response.data.message ?? 'error',
      };
    });
};
