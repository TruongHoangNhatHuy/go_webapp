import { Box, Stack, Typography } from "@mui/material";
import NavMenu from "./NavMenu";
import { Outlet, useLocation } from "react-router-dom";

// Component ghi path lên màn hình
const Content = () => {
	const location = useLocation();
	return (
	  <Typography variant="body2" sx={{ pb: 2 }} color="text.secondary">
			Current route: {location.pathname}
	  </Typography>
	);
}

const MainLayout = () => {
	return (
		<Stack direction={'row'} minHeight='100%'>
			<NavMenu/>
			<Box sx={{ bgcolor: 'cyan', padding: 0, margin: 0, width: "100%"}}>
				<Outlet/>
			</Box>
		</Stack>
	)
}

export default MainLayout;