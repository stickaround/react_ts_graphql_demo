import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';

export interface ConfirmModalProps {
  open: boolean;
  onClose: (value?: string) => void;
  onOk: () => void;
}

function ConfirmModal(props: ConfirmModalProps) {
  const { open, onClose, onOk } = props;

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth='xs'
      open={open}
    >
      <DialogTitle>Do you really want to delete?</DialogTitle>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button data-testid='confirmOK' onClick={onOk}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export { ConfirmModal };
