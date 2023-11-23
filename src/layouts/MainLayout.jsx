import { Box, Stack } from "@mui/material";
import NavMenu from "./NavMenu";
import { Outlet } from "react-router-dom";

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