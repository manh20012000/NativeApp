import React, { useEffect, useRef, useState } from "react";
import socketIOClient, { io } from "socket.io-client";
import path from "./confige/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
export const SocketContext = React.createContext(null);
export const useSocket = () => {
  return React.useContext(SocketContext);
};
import { useDispatch } from "react-redux";
import { Status } from "./Redex/Reducer/StatusUser";
export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const [userOnline, setUserOnline] = useState([]);
  const user = useSelector((state) => state.auth.value);
  useEffect(() => {
    const connectToSocketServer = async () => {
      if (user) {
        try {
          const userToken = await AsyncStorage.getItem("userToken");

          const userTokenObject = JSON.parse(userToken);
          //  console.log(userTokenObject)
          const accessToken = JSON.parse(userToken)?.accessToken;
          const iduser = JSON.parse(userToken)?._id;

          if (!accessToken) {
            throw new Error("JWT token not found");
          }

          const newSocket = socketIOClient(path, {
            transports: ["websocket"],
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: Infinity,
            auth: {
              token: accessToken,
              userId: iduser,
            },
          });
          newSocket.on("connect", () =>
            console.log("Connected to Socket.IO server")
          );
          newSocket.on("connect_error", (error) => {
            console.error("Socket.IO connection error:", error);
          });
          newSocket.on("UserOnline", (userId) => {
            dispatch(Status(userId));

            // setUserOnline(prevUsers => [...prevUsers, userId]);
          });
          newSocket.on("server-send-when-has-user-online", (userId) => {
            dispatch(Status(userId));

            // setUserOnline(prevUsers => [...prevUsers, userId]);
          });
          // Lắng nghe sự kiện "user-offline" từ máy chủ
          // socket.on("user-offline", (userId) => {
          //   setUserOnline((prevUsers) =>
          //     prevUsers.filter((user) => user !== userId)
          //   );
          // });
          setSocket(newSocket);
        } catch (error) {
          console.error("Error connecting to Socket.IO server:", error);
        }
      }
    };
    connectToSocketServer().then();

    return () => {
      socket?.disconnect();
      socket?.removeAllListeners();
      socket?.close();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
/*import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import path from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { connectSocket } from "./Redex/Reducer/SocketConnection";

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const connectToSocketServer = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        const accessToken = JSON.parse(userToken)?.accessToken;
        if (!accessToken) {
          throw new Error("JWT token not found");
        }

        const newSocket = socketIOClient(path, {
          transports: ["websocket"],
          reconnection: true,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          reconnectionAttempts: Infinity,
          auth: {
            token: accessToken,
          },
        });

        newSocket.on("connect", () => {
          console.log("Connected to Socket.IO server");
          // console.log(newSocket)
         
        });
 dispatch(connectSocket({ socket: newSocket }));
        newSocket.on("connect_error", (error) => {
          console.error("Socket.IO connection error:", error);
        });

        setSocket(newSocket);
      } catch (error) {
        console.error("Error connecting to Socket.IO server:", error);
      }
    };

    connectToSocketServer();

    return () => {
      if (socket) {
        socket.disconnect();
        socket.removeAllListeners();
        socket.close();
      }
    };
  }, []);
  // dispatch(connectSocket(socket))
  // console.log('chiildern', children)

  return children;
};

export default SocketProvider; */
