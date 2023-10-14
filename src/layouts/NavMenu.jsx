import { forwardRef, useEffect, useState } from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link as RouterLink, useLocation } from 'react-router-dom';
import './NavMenu.css';

// Link routing
const Link = forwardRef((itemProps, ref) => {
  return <RouterLink ref={ref} {...itemProps} role={undefined}/>;
});

const NavMenu = (props) => {
	const { menu } = props;
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