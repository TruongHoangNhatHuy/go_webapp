import { forwardRef, useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, IconButton } from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CommuteIcon from '@mui/icons-material/Commute';
import { MdOutlineReceiptLong, MdHistory, MdBookmarkBorder, MdMenu } from "react-icons/md";
import CssBaseline from "@mui/material/CssBaseline";
import './NavMenu.css';
import { useUserContext } from "contexts/UserContext";

// List menu của khách hàng
const customerMenu = [
	{
		to: "account",
		menuItem: "Tài khoản",
		menuIcon: <AccountBoxIcon />
	},
	{
		to: "booking",
		menuItem: "Đặt xe",
		menuIcon: <CommuteIcon />
	},
	{
		to: "orders",
		menuItem: "Đơn đặt",
		menuIcon: <MdOutlineReceiptLong />
	},
	{
		to: "bills",
		menuItem: "Lịch sử thanh toán",
		menuIcon: <MdHistory />
	},
	{
		to: "favorites",
		menuItem: "Địa điểm",
		menuIcon: <MdBookmarkBorder />
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
		to: "analysis",
		menuItem: "Thống kê",
	},
	{
		to: "customers",
		menuItem: "Quản lí khách hàng",
	},
	{
		to: "drivers",
		menuItem: "Quản lí tài xế",
	},
]

// Link routing
const Link = forwardRef((itemProps, ref) => {
	return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});


// Responsive NavMenu
const NavMenu = () => {

	const [mobileOpen, setMobileOpen] = useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const [user,] = useUserContext();
	const menu = 
		(user.role === 'customer') ? customerMenu : 
		(user.role === 'driver') ? driverMenu : 
		(user.role === 'admin') ? adminMenu : null;

	const [seletedItem, setSelectedItem] = useState('');
	const url = useLocation(); // Lấy location hiện tại của url
	useEffect(() => {
		// highlight menu item hiện tại
		setSelectedItem(url.pathname.substring(url.pathname.lastIndexOf('/') + 1));
	}, [url]);

	const drawerWidth = 120;
	const drawer = (
		menu.map(({ to, menuItem, menuIcon }) => (
			<ListItem className='list-item' key={to} component={Link} to={to} sx={{ alignItems: "center" }}>
				<ListItemButton className="list-item-btn" selected={seletedItem === to}>
					<ListItemIcon sx={{ justifyContent: 'center', fontSize: 25 }}>
						{menuIcon}
					</ListItemIcon>
					<ListItemText primary={menuItem} sx={{ color: "#70757a", whiteSpace: 'normal' }} />
				</ListItemButton>
			</ListItem>
		))
	)

	return (
		<Box sx={{ position: { xs: "absolute", md: "relative", sm: "relative" }, zIndex: { xs: "1" }, right: { xs: "0" }, bottom: { xs: "0" } }}>
			<CssBaseline />
			<Toolbar
				sx={{ display: { sm: "none", md: "none" } }}
			>
				<IconButton
					//   edge="start"
					onClick={handleDrawerToggle}
					sx={{ display: { sm: "none" } }}
				><MdMenu />
				</IconButton>
			</Toolbar>
			{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
			<Drawer
				// container={container}
				variant="temporary"
				open={mobileOpen}
				onClose={handleDrawerToggle}
				ModalProps={{
					keepMounted: true // Better open performance on mobile.
				}}
				sx={{
					display: { xs: "block", sm: "none" },
					"& .MuiDrawer-paper": {
						boxSizing: "border-box",
						paddingTop: "0px",
						paddingBottom: "0px",
						position: "relative",
						width: drawerWidth
					}
				}}
			>
				{drawer}
			</Drawer>
			<Drawer
				variant="permanent"
				sx={{
					display: { xs: "none", sm: "block" },
					"& .MuiDrawer-paper": {
						boxSizing: "border-box",
						position: "relative",
						width: drawerWidth
					}
				}}
				open
			>
				{drawer}
			</Drawer>
		</Box>
	)
}

export default NavMenu;