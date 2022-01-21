import { Store } from "pullstate";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UIStore = new Store({
    AndroidPermission:null,
    userId:AsyncStorage.getItem('@userId').then(res=>res),
    deviceId:null,
    brandName:'',
    lastLocation:null,
    splashScreen:null,
    login:false,
    user_token:null,
    user_type:"user" ,// user || admin || local_admin(like police,guradian),
    backendUrl:'', // Backend URL
    localUrl:'https://woman-safety-backend.vercel.app/api' , // Local Backend Url
})
