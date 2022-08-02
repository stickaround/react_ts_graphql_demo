import * as React from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Create';

import { ConfirmModal } from '../core/components/ConfirmModal';
import { useGetPostsQuery, useDeletePostMutation } from '../graphql/generated';
import { useNotificationContext } from '../contexts/notificationContext';

function PostList() {
  const [confirmModalOpen, setConfirmModalOpen] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState('');
  const navigate = useNavigate();
  const { data, loading, refetch } = useGetPostsQuery();
  const [deletePost, { data: deleted, loading: deleting }] =
    useDeletePostMutation();
  const { createNotification } = useNotificationContext();

  React.useEffect(() => {
    if (deleted) {
      if (deleted?.deletePost?.error) {
        createNotification('error', deleted.deletePost.error);
      } else {
        createNotification('success', 'Successfully deleted!');
        refetch();
      }
    }
  }, [deleted]);

  function handleOpenModal(id: string = '') {
    setConfirmModalOpen(true);
    setDeletingId(id);
  }

  function handleDelete() {
    deletePost({
      variables: { id: deletingId },
    });
    setConfirmModalOpen(false);
  }

  function handleClose() {
    setConfirmModalOpen(false);
  }

  return (
    <Container component={Paper} sx={{ m: 5 }}>
      <Table sx={{ minWidth: '700px', mt: 5 }} size='small'>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>...</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.posts?.data?.map((item, index: number) => (
            <TableRow key={item?._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item?.title}</TableCell>
              <TableCell>{item?.content}</TableCell>
              <TableCell>
                <Link to={`${item?._id}`}>
                  <IconButton aria-label='edit'>
                    <EditIcon />
                  </IconButton>
                </Link>
                <IconButton
                  aria-label='delete'
                  onClick={() => handleOpenModal(item?._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ConfirmModal
        open={confirmModalOpen}
        onOk={handleDelete}
        onClose={handleClose}
      />
    </Container>
  );
}

export { PostList };
