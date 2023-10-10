import { forwardRef, useEffect, useState } from "react";
import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link as RouterLink, useLocation } from 'react-router-dom';

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
		<Box sx={{ width: '100%', maxWidth: 240, bgcolor: "#282c34"}}>
			<List disablePadding>
				{// Render menu item theo list menu
					menu.map(({to, menuItem}) => (
						<ListItem component={Link} to={to}>
							<ListItemButton selected={seletedItem === to}>
								<ListItemText primary={menuItem} sx={{ color: "white"}}/>
							</ListItemButton>
						</ListItem>
					))
				}
			</List>
		</Box>
	)
}

export default NavMenu;