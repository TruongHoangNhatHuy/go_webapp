import * as React from 'react';
import { Avatar, Button, CssBaseline, Link, Paper, Box, Grid, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useGoogleLogin } from '@react-oauth/google';
import { login } from 'services/be_server/api_login';
import { useUserContext } from 'contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { getTokensByAuthCode } from 'services/gg_cloud/tokenHelper';
import { GooglePlayButton } from 'react-mobile-app-button';
import Wallpaper from 'assets/wallpaper.png';

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

  const handleLogin = async (codeResponse) => {
    // console.log('auth-code:', codeResponse);
    // Get tokens from GG Cloud
    var ggTokens = null;
    await getTokensByAuthCode(codeResponse.code)
      .then(result => {
        ggTokens = result;
      })
      .catch(error => {
        alert('Đăng nhập bằng GG thất bại.');
      })
    if (ggTokens === null) return; // Không có tokens thì thoát hàm  
    console.log('GG tokens', ggTokens);

    // BE login
    const userSession = {
      token: ggTokens.id_token,
      refreshToken: ggTokens.refresh_token,
      status: null,
      role: null,
      id: null
    }
    await login(userSession.token)
      .then(result => {
        console.log('login result', result);
        userSession.status = String(result.data.status).toLowerCase();
        userSession.role = String(result.data.role).toLowerCase();
        userSession.id = result.data.id;
      })
      .catch(error => {
        alert('Yêu cầu đến Go server thất bại.');
      });

    if (userSession.status === 'registered') {
      setUser(userSession);
      switch (userSession.role) {
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
          console.warn('Handle login failed: Role "'+ userSession.role +'" not existed');
          break;
      }
    }
    else if (userSession.status === 'unregistered') {
      setUser(userSession);
      navigate("/signup");
    }
    else if (userSession.status === 'uncheck') {
      alert('Tài khoản tài xế đang chờ xét duyệt. Vui lòng thử lại sau.');
    }
    else if (userSession.status === 'blocked') {
      alert('Tài khoản đã bị khóa.');
    }
    else {
      console.warn('Handle login failed: Status "'+ userSession.status +'" not existed');
    }
  }

  const ggLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: handleLogin,
    onError: (error) => console.log(error)
  })

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={false} md={7}
          // sx={{
          //   backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          //   backgroundRepeat: 'no-repeat',
          //   backgroundColor: (t) =>
          //     t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          //   backgroundSize: 'cover',
          //   backgroundPosition: 'center',
          // }}
        >
          <Box component='img' src={Wallpaper} 
            display={{ xs: 'none', md: 'block' }}
            sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </Grid>
        <Grid item xs={12} md={5} component={Paper} elevation={6} square>
          <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box mt={10}>
              <Button variant='outlined' onClick={ggLogin}>
                Đăng nhập bằng tài khoản Google
              </Button>
              {/* <GoogleLogin 
                onSuccess={(result) => console.log(result)}
                onError={() => console.log('GoogleLogin component: failed')}
              /> */}
            </Box>
            <Box mt={10} display={'flex'} flexDirection={'column'} alignItems={'center'}>
              <Typography variant='button' fontWeight='bold'>Tải về ứng dụng cho di động</Typography>
              <GooglePlayButton
                url={"https://drive.google.com/drive/folders/1KcAkgpJdYosGI0PjRmnh3AWvoLLiNAOZ?usp=drive_link"}
                theme={"dark"}
                height={50}
                width={180}
              />
            </Box>
            <Copyright sx={{ mt: 10 }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}