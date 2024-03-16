import React, { useEffect, useRef, useState } from "react";
import socketIOClient, { io } from "socket.io-client";
import path from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
export const SocketContext = React.createContext(null);
export const useSocket = () => {
  return React.useContext(SocketContext);
};
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const user = useSelector((state) => state.auth.value);
  useEffect(() => {
    const connectToSocketServer = async () => {
      if (user) {
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
          newSocket.on("connect", () =>
            console.log("Connected to Socket.IO server")
          );
          newSocket.on("connect_error", (error) => {
            console.error("Socket.IO connection error:", error);
          });

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
