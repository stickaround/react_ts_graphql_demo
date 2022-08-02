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
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { PostForm } from './form';
import { useCreatePostMutation } from '../graphql/generated';
import { useNotificationContext } from '../contexts/notificationContext';

function PostCreate() {
  const navigate = useNavigate();
  const [createPost, { data, loading }] = useCreatePostMutation();
  const { createNotification } = useNotificationContext();

  React.useEffect(() => {
    if (data) {
      if (data?.createPost?.error) {
        createNotification('error', data.createPost.error);
      } else {
        createNotification('success', 'Successfully created!');
        navigate('/posts');
      }
    }
  }, [data]);

  const payload = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Input title!'),
      content: Yup.string().required('Input content!'),
    }),
    onSubmit: (values) => {
      createPost({
        variables: { title: values.title, content: values.content },
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
            CREATE POST
          </Typography>
          <PostForm
            handleChange={payload.handleChange}
            handleSubmit={payload.handleSubmit}
            errors={{
              title: payload.errors.title ?? '',
              content: payload.errors.content ?? '',
            }}
            touched={{
              title: payload.touched.title ?? false,
              content: payload.touched.content ?? false,
            }}
            values={payload.values}
            submitText='Create'
          />
        </CardContent>
      </Card>
    </Container>
  );
}

export { PostCreate };
