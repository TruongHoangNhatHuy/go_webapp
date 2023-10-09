import MainLayout from "./MainLayout";

// List menu của admin
const menu = [
  {
		to: "account",
		menuItem: "Tài khoản",
	},
	{
		to: "analysis",
		menuItem: "Thống kê",
	},
  {
		to: "customers",
		menuItem: "Quản lí khách hàng",
	},
	{
		to: "drivers",
		menuItem: "Quản lí tài xế",
	},
]

const AdminLayout = () => {
  return (
		<MainLayout menu={menu}/>
	)
}

export default AdminLayout