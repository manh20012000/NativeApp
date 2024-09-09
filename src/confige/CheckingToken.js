import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import path from "./config";
import { login } from "../Redex/Reducer/auth.slice";
import { useDispatch } from "react-redux";
export class checkingToken {
  static dispath = useDispatch();
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
  static refreshToken = async (refreshToken) => {
    try {
      const url = `${path}/user/refreshToken`; // Sửa lỗi chính tả trong đường dẫn URL
      const response = await axios.post(
        url,
        { refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Nếu refresh token hợp lệ, trả về token mới
      if (response.status === 200 && response.data) {
        // Giả sử server phản hồi với đối tượng mới
        await AsyncStorage.setItem(
          "accessToken",
          JSON.stringify(response.data.ascesstoken)
        );
        await AsyncStorage.setItem(
          "refreshToken",
          JSON.stringify(response.data.refreshtoken)
        );
        // console.log(response.data);
        const userDataString = JSON.stringify(response.data);
        await AsyncStorage.setItem("userToken", userDataString);
        dispath(login(response.data));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Lỗi khi làm mới token:", error);
      return null;
    }
  };
}
