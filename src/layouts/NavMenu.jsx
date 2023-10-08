import React from "react";
import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';

// List menu
const menu = [
	{
		to: "/",
		primaryText: "Home",
	},
	{
		to: "/booking",
		primaryText: "Booking",
	},
	{
		to: "/about",
		primaryText: "About",
	},
]

// Link routing
const Link = React.forwardRef((itemProps, ref) => {
  return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});

const NavMenu = () => {
	return (
		<Box sx={{ width: '100%', maxWidth: 240, bgcolor: "#282c34"}}>
			<List disablePadding>
				{// Render menu item theo list menu
					menu.map(({to, primaryText}) => (
						<ListItem component={Link} to={to}>
							<ListItemButton>
								<ListItemText primary={primaryText} sx={{ color: "white"}}/>
							</ListItemButton>
						</ListItem>
					))
				}
			</List>
		</Box>
	)
}

export default NavMenu;