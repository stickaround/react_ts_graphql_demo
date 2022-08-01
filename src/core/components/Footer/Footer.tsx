import {
  Box,
  CssBaseline,
  BottomNavigation,
  Paper,
  Typography,
} from '@mui/material';

function Footer() {
  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
        }}
        elevation={3}
      >
        <BottomNavigation value={0} sx={{ backgroundColor: '#1976d2' }}>
          <Typography
            sx={{ display: 'flex', alignItems: 'center', color: 'white' }}
          >
            Made by Tony Cronus, 2022
          </Typography>
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export { Footer };
