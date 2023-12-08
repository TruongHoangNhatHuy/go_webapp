import { Client } from '@stomp/stompjs';
import { useUserContext } from 'contexts/UserContext';
import { createContext, useContext, useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import config from 'config.json';

const server = config.be_rootUrl;
const SocketContext = createContext(null);
const subscribedEndpoint = [];  // List endpoint đã subscribe.
// Khi gọi useSocketSubscriber trước khi kết nối được thiết lập, endpoint sẽ vào hàng đợi.
const waittingSubscribe = [];   // List hàng đợi subscribe.

// Socket Provider component
export const SocketProvider = ({ children }) => {
  const [client,] = useState(new Client());
  const [user,] = useUserContext();

  useEffect(() => {
    const authToken = "Bearer "+ user.token;
    const socketUrl = server +"/ws?Authorization="+ authToken;
    // Thiết lập kết nối
    client.webSocketFactory = () => new SockJS(socketUrl);
    client.reconnectDelay = 3000;
    client.onConnect = (info) => {
      console.log('WS connected');
      // Giải quyết hàng đợi subscribe
      while (waittingSubscribe.length !== 0) {
        const newSubscribe = waittingSubscribe.pop();
        if (subscribedEndpoint.includes(newSubscribe.endpoint)) {
          console.log('Endpoint already subscribed: ', newSubscribe.endpoint);
        } else {
          client.subscribe(newSubscribe.endpoint, (receive) =>  newSubscribe.callback(receive.body), {id: subscribedEndpoint.length});
          console.log('Endpoint subscribed with id', subscribedEndpoint.length, ':', newSubscribe.endpoint);
          subscribedEndpoint.push(newSubscribe.endpoint);
        }
      }
      console.log('List of endpoint subscribed: ', subscribedEndpoint);
    };
    client.onStompError = (error) => {
      console.log('WS error', error);
    }
    client.activate();
  }, [])

  return (
    <SocketContext.Provider value={client}>
      {children}
    </SocketContext.Provider>
  )
}

// Socket Client hook
export const useSocketClient = () => {
  return useContext(SocketContext);
}

/* How to use:
  const client = useSocketClient();
  SocketFunction(client, ...);
*/

// Socket Subscribe function.
export const SocketSubscriber = (client, endpoint, callback=(result)=>{}) => {
  if (client.connected) { 
    if (subscribedEndpoint.includes(endpoint)) {
      console.log('Endpoint already subscribed: ', endpoint);
    } else {
      client.subscribe(endpoint, (receive) => callback(receive.body), {id: subscribedEndpoint.length});
      console.log('Endpoint subscribed with id', subscribedEndpoint.length, ':', endpoint);
      subscribedEndpoint.push(endpoint);
      console.log('List of endpoint subscribed:', subscribedEndpoint);
    }
  } else {
    if (waittingSubscribe.indexOf(endpoint) === -1) {
      waittingSubscribe.push({
        endpoint: endpoint,
        callback: callback
      });
      console.log('Endpoint is waitting to subscribe:', endpoint);
    }
  }
}

// Socket Unsubscribe function.
export const SocketUnsubscribe = (client, endpoint) => {
  if (client.connected) {
    const index = subscribedEndpoint.indexOf(endpoint);
    if (index !== -1) {
      client.unsubscribe(index);
      subscribedEndpoint.splice(index, 1);
      console.log('Endpoint unsubscribed:', endpoint);
      console.log('List of endpoint subscribed:', subscribedEndpoint);
    } else {
      console.log('Endpoint has not subscribed yet:', endpoint);
      console.log('List of endpoint subscribed:', subscribedEndpoint);
    }
  }
}

// Socket Publish (send) function
export const SocketPublish = (client, endpoint, body) => {
  if (client.connected) {
    client.publish({
      destination: endpoint, 
      headers: {}, 
      body: JSON.stringify(body)
    })
  }
}