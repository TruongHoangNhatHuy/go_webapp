import { ActivationState, Stomp } from "@stomp/stompjs";
import { useUserContext } from "contexts/UserContext";
import SockJS from "sockjs-client"

var client = null;  // Singleton
const subscribedEndpoint = []; // chứa các endpoint đã subscribe

// Socket Wrapper Component, khởi tạo kết nối đến server
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

// Function, not Component!!!
// Lắng nghe 1 endpoint, cần 1 hàm callback xử lý nhận gói tin
export const SocketSubscriber = (endpoint, callback=(result)=>{}) => {
  if (client.connected) {
    // Nếu đã kết nối, thực hiện lắng nghe
    if (subscribedEndpoint.includes(endpoint)) {
      console.log('WS endpoint subscribed. List of endpoint subscribed', subscribedEndpoint);
      // throw Error('WS endpoint subscribed');
    }
    else {
      subscribedEndpoint.push(endpoint);
      client.subscribe(endpoint, (data) => callback(data.body));
    }
  }
  else {
    // Nếu không, chờ kết nối rồi thực hiện lắng nghe
    client.onConnect = () => {
      if (subscribedEndpoint.includes(endpoint)) {
        console.log('WS endpoint subscribed. List of endpoint subscribed', subscribedEndpoint);
        // throw Error('WS endpoint subscribed');
      }
      else {
        subscribedEndpoint.push(endpoint);
        client.subscribe(endpoint, (data) => callback(data.body));
      }
    }
  }
}

// Function, not Component!!!
// Gửi message đến 1 endpoint
export const SocketSender = (endpoint, messageString, header = {}) => {
  if (client.connected) {
    client.send(endpoint, header, messageString);
  }
  else {
    client.onConnect = () => client.send(endpoint, header, messageString);
  }
}