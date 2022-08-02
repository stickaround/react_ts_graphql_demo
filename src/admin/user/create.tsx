import * as React from 'react';
import { Container, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { UserForm } from './form';
import { useCreateUserMutation } from '../../graphql/generated';
import { useNotificationContext } from '../../contexts/notificationContext';

function UserCreate() {
  const navigate = useNavigate();
  const [createUser, { data, loading }] = useCreateUserMutation();
  const { createNotification } = useNotificationContext();

  React.useEffect(() => {
    if (data) {
      if (data?.createUser?.error) {
        createNotification('error', data.createUser.error);
      } else {
        createNotification('success', 'Successfully created!');
        navigate('/users');
      }
    }
  }, [data]);

  const payload = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Input title!'),
      password: Yup.string().required('Input password!'),
    }),
    onSubmit: (values) => {
      createUser({
        variables: { username: values.username, password: values.password },
      });
    },
  });
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ width: 500, m: '100px' }}>
        <CardContent>
          <Typography
            gutterBottom
            variant='h5'
            component='div'
            sx={{ textAlign: 'center' }}
          >
            CREATE USER
          </Typography>
          <UserForm
            handleChange={payload.handleChange}
            handleSubmit={payload.handleSubmit}
            errors={{
              username: payload.errors.username ?? '',
              password: payload.errors.password ?? '',
            }}
            touched={{
              username: payload.touched.username,
              password: payload.touched.password,
            }}
            values={payload.values}
            submitText='Create'
          />
        </CardContent>
      </Card>
    </Container>
  );
}

export { UserCreate };
