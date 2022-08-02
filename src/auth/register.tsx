import * as React from 'react';
import {
  Container,
  Card,
  CardContent,
  FormControl,
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { useRegisterMutation } from '../graphql/generated';
import { useNotificationContext } from '../contexts/notificationContext';

function Register() {
  const [registerUser, { data, loading }] = useRegisterMutation();
  const { createNotification } = useNotificationContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) {
      if (data?.register?.error) {
        createNotification('error', data.register.error);
      } else {
        localStorage.setItem('token', data?.register?.token ?? '');
        createNotification('success', 'Register success!');
        navigate('/posts');
      }
    }
  }, [data]);

  const credentials = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Input username!'),
      password: Yup.string().required('Input password!'),
    }),
    onSubmit: (values) => {
      registerUser({
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
            REGISTER
          </Typography>
          <Box component='form' onSubmit={credentials.handleSubmit}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id='username'
                name='username'
                label='Username'
                variant='standard'
                error={
                  !!(
                    credentials.touched.username && credentials.errors.username
                  )
                }
                helperText={credentials.errors.username}
                onChange={credentials.handleChange}
                value={credentials.values.username}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id='password'
                name='password'
                label='Password'
                variant='standard'
                type='password'
                error={
                  !!(
                    credentials.touched.password && credentials.errors.password
                  )
                }
                helperText={credentials.errors.password}
                onChange={credentials.handleChange}
                value={credentials.values.password}
              />
            </FormControl>
            <Box
              component='div'
              sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
            >
              <Button
                size='small'
                color='primary'
                variant='contained'
                type='submit'
                sx={{ mr: 1 }}
              >
                Register
              </Button>
              <Link to='/auth/login' style={{ textDecoration: 'none' }}>
                <Button size='small' color='info' variant='contained'>
                  Login
                </Button>
              </Link>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export { Register };
