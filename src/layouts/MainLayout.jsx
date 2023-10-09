import { Container, Stack, Typography } from "@mui/material";
import NavMenu from "./NavMenu";
import { Route, Routes, useLocation } from "react-router-dom";

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
			<Container maxWidth='100%' sx={{ bgcolor: 'cyan'}}>
				<text>Cửa sổ con</text><br/>
				{/* Xác định các path được route, và component tương ứng */}
				<Routes>
					<Route path='*' element={<text>404 Not Found</text>}/>
					{// Render path theo list menu
            menu.map(({to, menuItem}) => (
              <Route path={to} element={<text>{menuItem}</text>}/>
            ))
          }
				</Routes>
			</Container>
		</Stack>
	)
}

export default MainLayout;