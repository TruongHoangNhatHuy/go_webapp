import { forwardRef, useState } from "react";
import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';

// Link routing
const Link = forwardRef((itemProps, ref) => {
  return <RouterLink ref={ref} {...itemProps} role={undefined}/>;
});

const NavMenu = (props) => {
	const { menu } = props;
	const [seletedItem, setSelectedItem] = useState('');
	
	// highlight menu item đang được chọn
	const handleListItemClick = (item) => {
    return (event) => setSelectedItem(item);
  };

	return (
		<Box sx={{ width: '100%', maxWidth: 240, bgcolor: "#282c34"}}>
			<List disablePadding>
				{// Render menu item theo list menu
					menu.map(({to, menuItem}) => (
						<ListItem component={Link} to={to}>
							<ListItemButton selected={seletedItem === menuItem} onClick={handleListItemClick(menuItem)}>
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