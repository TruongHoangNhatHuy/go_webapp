import { Box, Stack } from "@mui/material";
import NavMenu from "./NavMenu";
import { Outlet } from "react-router-dom";
import { createContext, useContext, useState } from "react";

// Tạo badge thông báo trên Item của NavMenu
const NotifyContext = createContext(null);
export const useNotifyContext = () => {
	return useContext(NotifyContext);
}

const MainLayout = () => {
	const [notify, setNotify] = useState(null);

	return (
		<NotifyContext.Provider value={[notify, setNotify]}>
			<Stack direction={'row'} minHeight='100%' overflow={"hidden"}>
				<NavMenu/>
				<Box sx={{width: "100vw", height : "100vh"}}>
					<Outlet/>
				</Box>
			</Stack>
		</NotifyContext.Provider>
	)
}

export default MainLayout;