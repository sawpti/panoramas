import { IDataPanorama, IDataFirebase } from "./Panoramas";
import { IDataUsers } from "./Users";
export { default as Users } from "./Users";
export { default as Posts } from "./Panoramas";
export interface IState {
  Posts: {
    // Panoramas
    //  panoramaImage?: string;
    data: IDataPanorama;
    data1: IDataFirebase;
    fetched: boolean;
    fetching: boolean;
    alert: boolean;
  };
  Users: {
    profileImage?: string;
    data: IDataUsers;
    fetched: boolean;
    fetching: boolean;
  };
}
