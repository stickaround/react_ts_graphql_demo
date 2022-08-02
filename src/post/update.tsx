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
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { PostForm } from './form';
import { useGetPostQuery, useUpdatePostMutation } from '../graphql/generated';
import { useNotificationContext } from '../contexts/notificationContext';

function PostUpdate() {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const [updatePost, { data: updated, loading: updating }] =
    useUpdatePostMutation();
  const { data, loading } = useGetPostQuery({
    variables: { id },
  });
  const { createNotification } = useNotificationContext();

  React.useEffect(() => {
    if (data?.post?.error) {
      createNotification('error', data.post.error);
      navigate('/posts');
    } else {
      payload.setTouched({
        title: true,
        content: true,
      });
      payload.setValues({
        title: data?.post?.data?.title,
        content: data?.post?.data?.content,
      });
    }
  }, [data]);

  React.useEffect(() => {
    if (updated) {
      if (updated?.updatePost?.error) {
        createNotification('error', updated.updatePost.error);
      } else {
        createNotification('success', 'Successfully updated!');
        navigate('/posts');
      }
    }
  }, [updated]);

  const payload = useFormik({
    initialValues: {
      title: data?.post?.data?.title,
      content: data?.post?.data?.content,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Input title!'),
      content: Yup.string().required('Input content!'),
    }),
    onSubmit: (values) => {
      updatePost({
        variables: {
          id,
          title: values.title,
          content: values.content,
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
            UPDATE POST
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
            submitText='Update'
          />
        </CardContent>
      </Card>
    </Container>
  );
}

export { PostUpdate };
