import MainLayout from "./MainLayout";

// List menu của tài xế
const menu = [
  {
		to: "account",
		menuItem: "Tài khoản",
	},
	{
		to: "orders",
		menuItem: "Đơn đặt",
	},
	{
		to: "analysis",
		menuItem: "Thống kê",
	},
  {
		to: "ratings",
		menuItem: "Đánh giá",
	},
]

const DriverLayout = () => {
  return (
		<MainLayout menu={menu}/>
	)
}

export default DriverLayout