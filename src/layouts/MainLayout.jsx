import { Container, Stack } from "@mui/material";
import NavMenu from "./NavMenu"

const MainLayout = () => {
	return (
		<Stack direction={'row'} maxHeight='100%'>
			<NavMenu/>
			<Container maxWidth='100%' sx={{ bgcolor: 'cyan'}}>
				<text>Cửa sổ con</text>
			</Container>
		</Stack>
	)
}

export default MainLayout;