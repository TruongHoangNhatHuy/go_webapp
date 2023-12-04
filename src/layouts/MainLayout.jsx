import { Box, Stack, Typography } from "@mui/material";
import NavMenu from "./NavMenu";
import { Outlet, useLocation } from "react-router-dom";
import { Height } from "@mui/icons-material";
// import SockJS from "sockjs-client/dist/sockjs"
// import {over} from "stompjs"

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
		<Stack direction={'row'} minHeight='100%' overflow={"hidden"}>
			<NavMenu/>
			<Box sx={{width: "100vw", height : "100vh"}}>
				<Outlet/>
			</Box>
		</Stack>
	)
}

export default MainLayout;