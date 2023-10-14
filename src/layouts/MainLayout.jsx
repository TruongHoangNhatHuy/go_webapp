import { Box, Stack, Typography } from "@mui/material";
import NavMenu from "./NavMenu";
import { Route, Routes, useLocation } from "react-router-dom";
import Map from "../services/mapbox/Map";

// List menu mẫu
// const menu = [
// 	{
// 		to: "/",
// 		menuItem: "Home",
// 	},
// 	{
// 		to: "booking",
// 		menuItem: "Booking",
// 	},
// 	{
// 		to: "about",
// 		menuItem: "About",
// 	},
// ]

// Component ghi path lên màn hình
const Content = () => {
	const location = useLocation();
	return (
	  <Typography variant="body2" sx={{ pb: 2 }} color="text.secondary">
			Current route: {location.pathname}
	  </Typography>
	);
}

const MainLayout = (props) => {
	const { menu } = props;

	return (
		<Stack direction={'row'} minHeight='100%'>
			<NavMenu menu={menu}/>
			<Box sx={{ bgcolor: 'cyan', padding: 0, margin: 0, width: "100%"}}>
				{/* Xác định các path được route, và component tương ứng */}
				<Routes>
					<Route index element={<Map/>}/>
					<Route path='*' element={<text>404 Not Found</text>}/>
					{// Render path theo list menu
            menu.map(({to, menuItem}) => (
              <Route path={to} element={<text>{menuItem}</text>}/>
            ))
          }
				</Routes>
			</Box>
		</Stack>
	)
}

export default MainLayout;