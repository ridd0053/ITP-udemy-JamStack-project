import { SET_USER } from "./action-types";

// action creator
export const setUser = user => {
    return {
        type: SET_USER,
        payload: { user },
    }
}