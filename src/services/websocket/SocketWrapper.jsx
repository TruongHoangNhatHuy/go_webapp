import { Stomp } from "@stomp/stompjs";
import { useUserContext } from "contexts/UserContext";
import SockJS from "sockjs-client"

/* Code này không tối ưu, sẽ bị thay thế sau. 
  Chỉ dùng với mục đích thử nghiệm. 
*/

var client = null;  // Singleton
const subscribedEndpoint = []; // chứa các endpoint đã subscribe

// Socket Wrapper Component, khởi tạo kết nối đến server
export const SocketWrapper = ({ children }) => {
  const [user,] = useUserContext();
  const authToken = "Bearer "+ user.token;

  const url = "https://goapi-production-9e3a.up.railway.app/ws?Authorization="+ authToken;
  const socket = new SockJS(url);
  client = Stomp.over(socket);
  
  client.reconnect_delay = 3000;
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

const handleSubscribe = (endpoint, callback) => {
  if (subscribedEndpoint.includes(endpoint)) {
    console.log('WS endpoint already subscribed: ', endpoint);
    // throw Error('WS endpoint subscribed');
  }
  else {
    subscribedEndpoint.push(endpoint);
    client.subscribe(endpoint, (data) => callback(data.body), {id: subscribedEndpoint.length});
  }
  console.log('WS List of endpoint subscribed: ', subscribedEndpoint);
}
// Function, not Component!!!
// Lắng nghe 1 endpoint, cần 1 hàm callback xử lý nhận gói tin
export const SocketSubscriber = (endpoint, callback=(result)=>{}) => {
  if (client.connected) {
    // Nếu đã kết nối, thực hiện lắng nghe
    handleSubscribe(endpoint, callback);
  }
  else {
    // Nếu không, chờ kết nối rồi thực hiện lắng nghe
    client.onConnect = () => handleSubscribe(endpoint, callback);
  }
}

// Function, not Component!!!
// Huỷ lắng nghe 1 endpoint
export const SocketUnsubscribe = (endpoint) => {
  if (client.connected) {
    const index = subscribedEndpoint.indexOf(endpoint);
    if (index !== -1) {
      subscribedEndpoint.splice(index, 1);
      client.unsubscribe(index);
      console.log('WS unsubscribed: ', endpoint);
    }
    else {
      console.log('This endpoint may have not been subscribed yet! Endpoint: ', endpoint);
    }
    console.log('WS List of endpoint subscribed: ', subscribedEndpoint);
  }
}

// Function, not Component!!!
// Gửi message đến 1 endpoint
export const SocketSender = (endpoint, body, header = {}) => {
  if (client.connected) {
    // Nếu đã kết nối, thực hiện gửi gói tin
    client.send(endpoint, header, body);
  }
  else {
    // Nếu không, chờ kết nối rồi thực hiện gửi gói tin
    client.onConnect = () => client.send(endpoint, header, body);
  }
}