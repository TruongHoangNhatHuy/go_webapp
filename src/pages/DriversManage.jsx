import { AppBar, Container, ListItem, ListItemButton, ListItemText } from "@mui/material"
import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"

export const DriverManage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const current = location.pathname.split('/')[3];
  const [selectedItem, setSelectedItem] = useState(current);

  useEffect(() => {
    navigate('interview')
  }, []);
  
  useEffect(() => {
    setSelectedItem(current);
  }, [current]);

  return (
    <Container component='main' disableGutters sx={{ margin: 0, padding: 0 }}>
      {/* Tab bar */}
      <AppBar position="sticky" elevation={1} sx={{ width: '100%', bgcolor: 'whitesmoke' }}>
        <ListItem disablePadding>
          <ListItemButton component={Link} to='interview' selected={selectedItem === 'interview'}>
            <ListItemText sx={{ color: selectedItem === 'interview' ? 'darkgreen' : 'gray' }}>
              <b>Xét duyệt tài xế</b>
            </ListItemText>
          </ListItemButton>
          <ListItemButton component={Link} to='manage' selected={selectedItem === 'manage'}>
            <ListItemText sx={{ color: selectedItem === 'manage' ? 'darkgreen' : 'gray' }}>
              <b>Quản lý tài xế</b>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </AppBar>
      {/* Cửa sổ chính */}
      <Outlet/>
    </Container>
  )
}