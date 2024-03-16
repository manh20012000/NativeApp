import { io } from "socket.io-client";
import path from "../config";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const socketConnect = (user) => {
  // // const user = useSelector((state) => state.auth.value);
  // const [socket, setSocket] = useState(null);
  // const [onlineSocket, setOnlineSocket] = useState([]);
  //
  // useEffect(() => {
  //   if (user) {
  //     // Khi user đăng nhập, tạo và kết nối socket
  //     const newSocket = io.connect(`${path}`, {
  //       query: {
  //         userId: user._id,
  //       },
  //     });
  //
  //     setSocket(newSocket);
  //
  //     // Gửi sự kiện lên server để thông báo là user đang online
  //     newSocket.emit("getOnlineUser", { userId: user._id, status: "online" });
  //
  //     // Lắng nghe sự kiện để cập nhật danh sách user online
  //     newSocket.on("getOnlineUser", (onlineUsers) => {
  //       setOnlineSocket(onlineUsers);
  //     });
  //     return () => socket.close();
  //   } else {
  //     // Nếu không có user, đóng kết nối socket (nếu có)
  //     if (socket) {
  //       socket.emit("getOnlineUser", { userId: user._id, status: "offline" });
  //       socket.close();
  //       setSocket(null);
  //     }
  //   }
  //
  //   // Cleanup effect
  //   return () => {
  //     if (socket) {
  //       socket.close();
  //       setSocket(null);
  //     }
  //   };
  // }, []);
  //
  // return { socket, onlineSocket };
};

export default socketConnect;
