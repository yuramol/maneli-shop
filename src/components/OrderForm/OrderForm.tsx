import { TextField } from '@/legos';
import { useFormik } from 'formik';
import * as yup from 'yup';

enum OrderUserFields {
  Name = 'name',
  Phone = 'phone',
}

export const OrderForm = () => {
  const initialValues = {
    [OrderUserFields.Name]: '',
    [OrderUserFields.Phone]: '',
  };

  const phoneRegExp = /^(\+380|0)\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
  const validationSchema = yup.object({
    [OrderUserFields.Name]: yup.string().required('Будь ласка, заповніть дане поле'),
    [OrderUserFields.Phone]: yup
      .string()
      .required('Будь ласка, заповніть дане поле')
      .matches(phoneRegExp, 'Будь ласка, вкажіть коректно телефон'),
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      console.log(values);
    },
  });

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div>Order Form</div>
      <TextField
        label="Імʼя отримувача"
        type="text"
        name={OrderUserFields.Name}
        value={values[OrderUserFields.Name]}
        placeholder="Павло"
        onBlur={handleBlur}
        onChange={handleChange}
        isError={!!touched[OrderUserFields.Name] && !!errors[OrderUserFields.Name]}
        errorText={errors[OrderUserFields.Name]}
      />
      <TextField
        label="Ваш телефон"
        type="tel"
        name={OrderUserFields.Phone}
        value={values[OrderUserFields.Phone]}
        placeholder="+380 00 000 00 00"
        onBlur={handleBlur}
        onChange={handleChange}
        isError={!!touched[OrderUserFields.Phone] && !!errors[OrderUserFields.Phone]}
        errorText={errors[OrderUserFields.Phone]}
      />

      <button type="submit">Submit</button>
    </form>
  );
};
