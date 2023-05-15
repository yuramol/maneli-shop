import { useFormik } from 'formik';
import * as yup from 'yup';
import { OptionsSwitcher, QuantitySelector, TextField } from '@/legos';

enum OrderUserFields {
  Quantity = 'quantity',
  Name = 'name',
  Phone = 'phone',
  Color = 'color',
  Model = 'model',
}

const colorOptions = [{ value: '#FFFFFF' }, { value: '#A9A9A9' }, { value: '#464646' }];
const modelOptions = [
  { label: '5W', value: '5' },
  { label: '7W', value: '7' },
  { label: '12W', value: '12' },
];

export const OrderForm = () => {
  const initialValues = {
    [OrderUserFields.Quantity]: 1,
    [OrderUserFields.Name]: '',
    [OrderUserFields.Phone]: '',
    [OrderUserFields.Color]: '',
    [OrderUserFields.Model]: '',
  };

  const phoneRegExp = /^(\+380|0)\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
  const validationSchema = yup.object({
    [OrderUserFields.Name]: yup.string().required('Будь ласка, заповніть дане поле'),
    [OrderUserFields.Phone]: yup
      .string()
      .required('Будь ласка, заповніть дане поле')
      .matches(phoneRegExp, 'Будь ласка, вкажіть коректно телефон'),
  });

  const { values, errors, setFieldValue, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      console.log(values);
    },
  });

  return (
    <>
      <h4 className="font-bold text-xl md:text-3xl">Ваше замовлення:</h4>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex">
          
        </div>
        <QuantitySelector
          name={OrderUserFields.Quantity}
          value={values[OrderUserFields.Quantity]}
          setValue={setFieldValue}
        />
        <OptionsSwitcher
          title="Колір"
          showLabels={false}
          name={OrderUserFields.Color}
          value={values[OrderUserFields.Color]}
          options={colorOptions}
          onChange={handleChange}
        />
        <OptionsSwitcher
          title="Модель"
          name={OrderUserFields.Model}
          value={values[OrderUserFields.Model]}
          options={modelOptions}
          onChange={handleChange}
        />
        <TextField
          label="Імʼя отримувача"
          type="text"
          name={OrderUserFields.Name}
          value={values[OrderUserFields.Name]}
          placeholder="Павло"
          onChange={handleChange}
          isError={!!errors[OrderUserFields.Name]}
          errorText={errors[OrderUserFields.Name]}
        />
        <TextField
          label="Ваш телефон"
          type="tel"
          name={OrderUserFields.Phone}
          value={values[OrderUserFields.Phone]}
          placeholder="+380 00 000 00 00"
          onChange={handleChange}
          isError={!!errors[OrderUserFields.Phone]}
          errorText={errors[OrderUserFields.Phone]}
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};
