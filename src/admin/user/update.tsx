import * as React from 'react';
import { Container, Card, CardContent, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { UserForm } from './form';
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from '../../graphql/generated';
import { useNotificationContext } from '../../contexts/notificationContext';

function UserUpdate() {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const [updateUser, { data: updated, loading: updating }] =
    useUpdateUserMutation();
  const { data, loading } = useGetUserQuery({
    variables: { id },
  });
  const { createNotification } = useNotificationContext();

  React.useEffect(() => {
    if (data?.user?.error) {
      createNotification('error', data.user.error);
      navigate('/users');
    } else {
      payload.setTouched({
        username: true,
        password: false,
      });
      payload.setValues({
        username: data?.user?.data?.username ?? '',
        password: '',
      });
    }
  }, [data]);

  React.useEffect(() => {
    if (updated) {
      if (updated?.updateUser?.error) {
        createNotification('error', updated.updateUser.error);
      } else {
        createNotification('success', 'Successfully updated!');
        navigate('/users');
      }
    }
  }, [updated]);

  const payload = useFormik({
    initialValues: {
      username: data?.user?.data?.username ?? '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Input username!'),
      password: Yup.string().required('Input password!'),
    }),
    onSubmit: (values) => {
      updateUser({
        variables: {
          id,
          username: values.username,
          password: values.password,
        },
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
            UPDATE User
          </Typography>
          <UserForm
            handleChange={payload.handleChange}
            handleSubmit={payload.handleSubmit}
            errors={{
              username: payload.errors.username ?? '',
              password: payload.errors.password ?? '',
            }}
            touched={{
              username: payload.touched.username ?? false,
              password: payload.touched.password ?? false,
            }}
            values={payload.values}
            submitText='Update'
          />
        </CardContent>
      </Card>
    </Container>
  );
}

export { UserUpdate };
