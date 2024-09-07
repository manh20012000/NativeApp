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

      if (isTokenExpired) {
        // nếu nhu hết hạn
        this.refreshToken(freshtoken.refreshtoken);
      }
    }
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
        dispath(login(response.data));
      } else {
        return null;
      }
    } catch (error) {
      console.error("Lỗi khi làm mới token:", error);
      return null;
    }
  };
}
