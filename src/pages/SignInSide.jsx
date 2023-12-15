import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GoogleLogin } from '@react-oauth/google';
import { login } from 'services/be_server/api_login';
import { useUserContext } from 'contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {
  const [, setUser] = useUserContext();
  const navigate =  useNavigate();

  const handleLogin = async (credentialResponse) => {
    console.log('GG login', credentialResponse);
    var status, role;

    await login(credentialResponse.credential)
      .then(result => {
        console.log('login result', result);
        status = String(result.data.status).toLowerCase();
        role = String(result.data.role).toLowerCase();
      })
      .catch(error => {
        alert('Đăng nhập thất bại.');
        return;
      });

    const userSession = { token: credentialResponse.credential, role: role };
    // console.log('user session', userSession)  

    if (status === 'registered') {
      setUser(userSession);
      switch (role) {
        case 'customer':
          navigate("/customer");
          break;
        case 'driver':
          navigate("/driver");
          break;
        case 'admin':
          navigate("/admin");
          break;
        default:
          console.warn('Handle login failed: Role "'+ role +'" not existed');
          break;
      }
    }
    else if (status === 'unregistered') {
      setUser(userSession);
      navigate("/signup");
    }
    else if (status === 'uncheck') {
      alert('Tài khoản tài xế đang chờ xét duyệt. Vui lòng thử lại sau.');
    }
    else if (status === 'blocked') {
      alert('Tài khoản đã bị khóa.');
    }
    else {
      console.warn('Handle login failed: Status "'+ status +'" not existed');
    }
  }
  // Admin login, will remove later
  const handleAdminLogin = () => {
    const adminSession = { token: '', role: 'admin' };
    setUser(adminSession);
    navigate("/admin");
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box mt={10}>
              <GoogleLogin 
                onSuccess={handleLogin}
                onError={() => {
                  console.log('GoogleLogin component: failed');
                }}
              />
              {/* will remove later */}
              {/* <Button onClick={handleAdminLogin}>Admin sign in</Button> */}
            </Box>
            <Copyright sx={{ mt: 20 }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}