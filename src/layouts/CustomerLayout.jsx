import MainLayout from "./MainLayout";

// List menu của khách hàng
const menu = [
  {
		to: "account",
		menuItem: "Tài khoản",
	},
	{
		to: "bookings",
		menuItem: "Đặt xe",
	},
	{
		to: "orders",
		menuItem: "Đơn đặt",
	},
	{
		to: "bills",
		menuItem: "Lịch sử thanh toán",
	},
  {
		to: "favorites",
		menuItem: "Địa điểm yêu thích",
	},
]

const CustomerLayout = () => {
  return (
		<MainLayout menu={menu}/>
	)
}

export default CustomerLayout