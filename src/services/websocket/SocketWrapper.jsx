import { Stomp } from "@stomp/stompjs";
import { useUserContext } from "contexts/UserContext";
import SockJS from "sockjs-client"

var client = null;  // Singleton

// Socket Wrapper, khởi tạo kết nối đến server
export const SocketWrapper = ({ children }) => {
  const [user,] = useUserContext();
  const authToken = "Bearer "+ user.token;

  const url = "https://goapi-production-9e3a.up.railway.app/ws?Authorization="+ authToken;
  const socket = new SockJS(url);
  client = Stomp.over(socket);
  
  // client.reconnectDelay = 3000;
  client.connect({}, 
    (frame) => {
      console.log('Stomp connected', frame);
    },
    (error) => {
      console.warn('Stomp error', error);
    }
  );

  return (children)
}

// Lắng nghe 1 endpoint, cần 1 hàm callback xử lý nhận gói tin
export const SocketSubscriber = (endpoint, callback=(result)=>{}) => {
  return client.subscribe(endpoint, (data) => callback(data.body));
}

// Gửi message đến 1 endpoint
export const SocketSender = (endpoint, messageString, header = {}) => {
  client.send(endpoint, header, messageString);
}