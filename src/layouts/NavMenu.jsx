import { forwardRef, useEffect, useState } from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link as RouterLink, useLocation } from 'react-router-dom';
import './NavMenu.css';

// List menu của khách hàng
const customerMenu = [
  {
		to: "account",
		menuItem: "Tài khoản",
	},
	{
		to: "booking",
		menuItem: "Đặt xe",
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

	return (
		<List className='list-box'>
			{// Render menu item theo list menu
				menu.map(({to, menuItem}) => (
					<ListItem className='list-item' component={Link} to={to}>
						<ListItemButton className="list-item-btn" selected={seletedItem === to}>
							<ListItemText primary={menuItem} sx={{ color: "white"}}/>
						</ListItemButton>
					</ListItem>
				))
			}
		</List>
	)
}

export default NavMenu;