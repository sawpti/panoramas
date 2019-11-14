import { IDataPosts } from './Panoramas';
export {default as Users} from './Users'
export {default as Posts} from './Panoramas'
export interface IState {
    Posts: {
        data: IDataPosts
        fetched: boolean
        fetching: boolean
    }
    Users: {
        profileImage?: string
    }
}
