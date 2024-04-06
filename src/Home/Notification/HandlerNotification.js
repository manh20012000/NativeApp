import messaging from "@react-native-firebase/messaging";
import { firestore } from "../../../Confige.js";
export class HandlerNotification {
  static checkNotofication = async () => {
    const authStatus = await messaging().requestPermission();
    if (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      console.log(authStatus);
    }
  };
}
