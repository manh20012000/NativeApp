import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import path from "./config";

export class checkingToken {
  // Kiểm tra token
  static checking = async (user) => {
    if (user !== null) {
      const decoded = jwtDecode(user.accessToken);
      const isTokenExpired = decoded.exp * 1000 < Date.now();
      // Nếu token hết hạn
      if (isTokenExpired) {
        // console.log("hahaha");
        return await this.handlerrefreshToken(user); // Làm mới token
      }
      return user; // Token hợp lệ
    }
    return false; // Token không tồn tại
  };

  // Làm mới token
  static handlerrefreshToken = async (user) => {
    try {
      console.log("làm mới token");
      const response = await axios.post(
        `${path}/user/refreshToken`,
        { refreshToken: user.refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log("làm mới token checking");
      if (response.status === 200 && response.data) {
        // Lưu token mới vào AsyncStorage

        const userDataString = JSON.stringify(data.data);
        const accessTokennew = JSON.stringify(data.data.accessToken);
        const refreshtokenNew = JSON.stringify(data.data.refreshToken);

        await AsyncStorage.setItem("accessToken", accessTokennew);
        await AsyncStorage.setItem("refreshToken", refreshtokenNew);
        await AsyncStorage.setItem("userToken", userDataString);

        return data.data; // Làm mới token thành công
      } else {
        return false; // Làm mới thất bại
      }
    } catch (error) {
      console.error("Lỗi khi làm mới token:", error);
      return false; // Trả về false khi có lỗi
    }
  };
}
