import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import path from "./config";
import { login } from "../Redex/Reducer/auth.slice";
import { useDispatch } from "react-redux";

export class checkingToken {
  static dispath = useDispatch();

  // Kiểm tra token
  static checking = async (token) => {
    if (token !== null) {
      const decoded = jwtDecode(token.accessToken);
      const isTokenExpired = decoded.exp * 1000 < Date.now();

      // Nếu token hết hạn
      if (isTokenExpired) {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        return this.refreshToken(refreshToken); // Làm mới token
      }
      return true; // Token hợp lệ
    }
    return false; // Token không tồn tại
  };

  // Làm mới token
  static refreshToken = async (refreshToken) => {
    try {
      const url = `${path}/user/refreshToken`; // Sửa đường dẫn URL nếu cần
      const response = await axios.post(
        url,
        { refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Kiểm tra phản hồi từ server
      if (response.status === 200 && response.data) {
        // Lưu token mới vào AsyncStorage
        await AsyncStorage.setItem(
          "accessToken",
          JSON.stringify(response.data.ascesstoken)
        );
        await AsyncStorage.setItem(
          "refreshToken",
          JSON.stringify(response.data.refreshtoken)
        );
        const userDataString = JSON.stringify(response.data);
        await AsyncStorage.setItem("userToken", userDataString);

        // Cập nhật Redux với dữ liệu mới
        this.dispath(login(response.data));

        return true; // Làm mới token thành công
      } else {
        return false; // Làm mới thất bại
      }
    } catch (error) {
      console.error("Lỗi khi làm mới token:", error);
      return false; // Trả về false khi có lỗi
    }
  };
}
