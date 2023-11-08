import { forwardRef, useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CommuteIcon from '@mui/icons-material/Commute';
import GoLogo from '../assets/1200px-Go_Logo_Green.png'
import './NavMenu.css';

// List menu của khách hàng
const customerMenu = [
  {
		to: "account",
		menuItem: "Tài khoản",
		menuIcon: <AccountBoxIcon/>
	},
	{
		to: "booking",
		menuItem: "Đặt xe",
		menuIcon: <CommuteIcon/>
	},
	{
		to: "orders",
		menuItem: "Đơn đặt",
	},
	{
		to: "bills",
		menuItem: "Lịch sử thanh toán",
	},
  {
		to: "favorites",
		menuItem: "Địa điểm yêu thích",
	},
]
// List menu của tài xế
const driverMenu = [
  {
		to: "account",
		menuItem: "Tài khoản",
	},
	{
		to: "orders",
		menuItem: "Đơn đặt",
	},
	{
		to: "analysis",
		menuItem: "Thống kê",
	},
  {
		to: "ratings",
		menuItem: "Đánh giá",
	},
]
// List menu của admin
const adminMenu = [
  {
		to: "account",
		menuItem: "Tài khoản",
	},
  {
		to: "customers",
		menuItem: "Quản lí khách hàng",
	},
	{
		to: "drivers",
		menuItem: "Quản lí tài xế",
	},
	{
		to: "analysis",
		menuItem: "Thống kê",
	},
]

// Link routing
const Link = forwardRef((itemProps, ref) => {
  return <RouterLink ref={ref} {...itemProps} role={undefined}/>;
});

const NavMenu = () => {
	const menu = customerMenu;
	const [seletedItem, setSelectedItem] = useState('');
	
	// Lấy location hiện tại của url
	const url = useLocation();
	useEffect(() => {
		// highlight menu item hiện tại
		setSelectedItem(url.pathname.substring(url.pathname.lastIndexOf('/') + 1));
	}, [url]);

	const drawerWidth = 220;
	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: drawerWidth,
					boxSizing: 'border-box',
				},
			}}
			variant="permanent"
			anchor="left"
		>
			<List className='list-box'>
				<Box component="img"
					src={GoLogo}
					sx={{
						height: 56,
						width: 150,
						padding: 2,
						paddingBottom: 1
					}}
				/>
				{// Render menu item theo list menu
					menu.map(({ to, menuItem, menuIcon }) => (
						<ListItem className='list-item' component={Link} to={to}>
							<ListItemButton className="list-item-btn" selected={seletedItem === to}>
								<ListItemIcon sx={{ color: 'white', justifyContent: 'center' }}>
									{menuIcon ? menuIcon : <DisabledByDefaultIcon/>}
								</ListItemIcon>
								<ListItemText primary={menuItem} sx={{ color: "white" }} />
							</ListItemButton>
						</ListItem>
					))
				}
			</List>
		</Drawer>
	)
}

export default NavMenu;