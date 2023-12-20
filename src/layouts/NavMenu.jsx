import { forwardRef, useEffect, useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Box, Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, IconButton, Badge } from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CommuteIcon from '@mui/icons-material/Commute';
import LogoutIcon from '@mui/icons-material/Logout';
import StarIcon from '@mui/icons-material/Star';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BadgeIcon from '@mui/icons-material/Badge';
import PeopleIcon from '@mui/icons-material/People';
import { MdOutlineReceiptLong, MdHistory, MdBookmarkBorder, MdMenu } from "react-icons/md";
import CssBaseline from "@mui/material/CssBaseline";
import './NavMenu.css';
import { useUserContext } from "contexts/UserContext";
import { useNotifyContext } from "./MainLayout";

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
	// {
	// 	to: "bills",
	// 	menuItem: "Lịch sử thanh toán",
	// 	menuIcon: <MdHistory />
	// },
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
		menuIcon: <AccountBoxIcon />
	},
	// {
	// 	to: "booking",
	// 	menuItem: "Đặt xe",
	// 	menuIcon: <CommuteIcon />
	// },
	{
		to: "orders",
		menuItem: "Đơn đặt",
		menuIcon: <MdOutlineReceiptLong />
	},
	{
		to: "analysis",
		menuItem: "Thống kê",
		menuIcon: <AssessmentIcon/>
	},
	{
		to: "ratings",
		menuItem: "Đánh giá",
		menuIcon: <StarIcon/>
	},
]
// List menu của admin
const adminMenu = [
	{
		to: "account",
		menuItem: "Tài khoản",
		menuIcon: <AccountBoxIcon />
	},
	{
		to: "drivers",
		menuItem: "Quản lí tài xế",
		menuIcon: <BadgeIcon/>
	},
	{
		to: "customers",
		menuItem: "Quản lí khách hàng",
		menuIcon: <PeopleIcon/>
	},
	{
		to: "analysis",
		menuItem: "Thống kê",
		menuIcon: <AssessmentIcon/>
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

	// Hiện menu tương ứng
	const [user, setUser] = useUserContext();
	const menu = (
		user.role === 'customer' ? customerMenu : 
		user.role === 'driver' ? driverMenu : 
		user.role === 'admin' ? adminMenu : []
	);

	// Đăng xuất
	const navigate = useNavigate();
	const logout = () => {
		if (window.confirm('Xác nhận đăng xuất?')) {
			setUser(null);
			sessionStorage.clear();
			navigate('/');
		}
	}

	// Highlight menu item hiện tại
	const [selectedItem, setSelectedItem] = useState('');
	const location = useLocation(); // Lấy location hiện tại của url
	const current = location.pathname.split('/')[2];
	useEffect(() => {
		setSelectedItem(current);
	}, [current]);

	// Kiểm tra item được gắn Badge
	const [notify, setNotify] = useNotifyContext();
	useEffect(() => {
		if (selectedItem === notify) {
			setNotify(null)
		}
	}, [selectedItem])

	// Render nội dung menu
	const drawerWidth = 120;
	const drawer = (
		<Box height='100vh'>
			{menu.map(({ to, menuItem, menuIcon }) => (
				<ListItem className='list-item' key={to} component={Link} to={to} sx={{ alignItems: "center" }}>
					<ListItemButton className="list-item-btn" selected={selectedItem === to}>
						<ListItemIcon sx={{ justifyContent: 'center', fontSize: 25 }}>
							<Badge variant="dot" color="primary" invisible={notify !== to || selectedItem === to}>
								{menuIcon}
							</Badge>
						</ListItemIcon>
						<ListItemText primary={menuItem} sx={{ color: "#70757a", whiteSpace: 'normal' }} />
					</ListItemButton>
				</ListItem>
			))}
			<ListItem className='list-item' sx={{ alignItems: "center" }}>
				<ListItemButton className="list-item-btn" onClick={logout}>
					<ListItemIcon sx={{ justifyContent: 'center', fontSize: 25 }}>
						<LogoutIcon/>
					</ListItemIcon>
					<ListItemText primary='Đăng xuất' sx={{ color: "#70757a", whiteSpace: 'normal' }}/>
				</ListItemButton>
			</ListItem>
		</Box>
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