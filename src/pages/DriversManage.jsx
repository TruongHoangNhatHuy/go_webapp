import { AppBar, Container, ListItem, ListItemButton, ListItemText } from "@mui/material"
import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"

const DriversManage = () => {
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
    <div>
      {/* Tab bar */}
      <AppBar position="sticky" elevation={1} sx={{ width: '100%', bgcolor: 'whitesmoke' }}>
        <ListItem disablePadding 
          sx={{
            ".Mui-selected": { bgcolor: 'lightgray!important',
              ".MuiListItemText-root": { color: 'green' }
            }
          }}
        >
          <ListItemButton component={Link} to='interview' selected={selectedItem === 'interview'}>
            <ListItemText sx={{ color: selectedItem === 'interview' ? 'green' : 'gray' }}>
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
      <div style={{ paddingLeft: 8 }}>
        <Outlet/>
      </div>
    </div>
  )
}

export default DriversManage