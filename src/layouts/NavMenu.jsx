import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const menu = [
	{
		primaryText: "Home",
	},
	{
		primaryText: "Booking",
	},
	{
		primaryText: "About",
	},
]

const NavMenu = () => {
	return (
		<Box sx={{ width: '100%', maxWidth: 240, bgcolor: "#282c34"}}>
			<List disablePadding>
				{// Render component theo biến menu
					menu.map(({primaryText}) => (
						<ListItem>
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