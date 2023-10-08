import { Container, Stack, Typography } from "@mui/material";
import NavMenu from "./NavMenu";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";

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
		<Stack direction={'row'} maxHeight='100%'>
			<NavMenu/>
			<Container maxWidth='100%' sx={{ bgcolor: 'cyan'}}>
				<text>Cửa sổ con</text><br/>
				{/* Xác định các path được route, và component tương ứng */}
				<Routes>
					<Route path='*' element={<text>404 Not Found</text>}/>
					<Route path='/' element={<text>Home</text>}/>
					<Route path='/booking' element={<text>Booking</text>}/>
					<Route path='/about' element={<text>About</text>}/>
				</Routes>
			</Container>
		</Stack>
	)
}

export default MainLayout;