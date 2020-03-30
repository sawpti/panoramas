import { IDataPanorama } from "./Panoramas";
import { IDataUsers } from "./Users";
export { default as Users } from "./Users";
export { default as Posts } from "./Panoramas";
export interface IState {
  Posts: {
    profileImage?: string;
    data: IDataPanorama;
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
