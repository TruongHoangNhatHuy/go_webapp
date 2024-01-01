import { CssBaseline, Link, Box, Typography, Container, Stack, Paper } from '@mui/material';
import GoLogo from 'assets/1200px-Go_Logo_Green.png';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { VerifyForm } from 'features/payment';
import { BookingContextProvider } from 'contexts/BookingContext';
import { GooglePlayButton } from 'react-mobile-app-button';
import DriverApp1 from 'assets/go_driver_1.png';
import DriverApp2 from 'assets/go_driver_2.png';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        PBL6
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function DriverPage() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth='sm'>
        <CssBaseline />
        <Stack
          spacing={3}
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component='img' src={GoLogo}
            sx={{
              height: 56,
              width: 150,
              marginBottom: 2
            }}
          />
          <Typography variant="h5" fontWeight='bold'>
            Tải về ứng dụng dành cho tài xế
          </Typography>
          <Stack direction='row' spacing={2}>
            <Paper sx={{ width: '50%', height: '50%' }}>
              <Box component='img' src={DriverApp1} 
                sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </Paper>
            <Paper sx={{ width: '50%', height: '50%' }}>
              <Box component='img' src={DriverApp2} 
                sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </Paper>
          </Stack>
          <GooglePlayButton
            url={"https://drive.google.com/drive/folders/1KcAkgpJdYosGI0PjRmnh3AWvoLLiNAOZ?usp=drive_link"}
            theme={"dark"}
            height={50}
            width={180}
          />
        </Stack>
        <Copyright sx={{ mt: 5, mb: 2 }} />
      </Container>
    </ThemeProvider>
  );
}