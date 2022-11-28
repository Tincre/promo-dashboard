import * as yup from 'yup';

const settingsDetailSchema = yup.object().shape({
  name: yup.string().nullable(),
  avatarUrl: yup.string().nullable(),
  userName: yup.string().nullable(),
  email: yup.string().nullable(),
});
export { settingsDetailSchema };
