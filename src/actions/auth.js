// types
import { types } from "../types/types";

/*export const login = ( uid, displayName ) => {
    return{
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}*/

// idem que codigo anterior con el return implicito
export const login = (uid, displayName) => ({
  // action del reducer
  type: types.login,
  payload: {
    uid,
    displayName
  }
});
