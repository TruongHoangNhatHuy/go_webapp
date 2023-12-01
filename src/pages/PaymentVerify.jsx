import { CssBaseline, Link, Box, Typography, Container } from '@mui/material';
import GoLogo from 'assets/1200px-Go_Logo_Green.png';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { VerifyForm } from 'features/payment';
import { BookingContextProvider } from 'contexts/BookingContext';

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

export default function Payment() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth='sm'>
        <CssBaseline />
        <Box
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
          <Typography variant="h4" fontWeight='bold'>
            Xác minh thanh toán
          </Typography>
          <BookingContextProvider>
            <VerifyForm/>
          </BookingContextProvider>
        </Box>
        <Copyright sx={{ mt: 5, mb: 2 }} />
      </Container>
    </ThemeProvider>
  );
}