import { combineReducers } from "redux";

export const AUTHENTICATED = "AUTHENTICATED";
export const GOT_ROOMS = "GOT_ROOMS";
export const BOOK_ROOM = "BOOK_ROOM";

const userReducer = (state={}, action) => {
  if(action.type === AUTHENTICATED) return action.payload
  if(action.type === BOOK_ROOM) return { ...state, bookedRoom: action.roomId }
  return state;
} 

const roomsReducer = (state=[], action) => {
  if(action.type === GOT_ROOMS) return action.payload;
  if(action.type === BOOK_ROOM) {
    return state.map(room => {
      if (room.id === action.roomId) {
        return { ...room, booked: true };
      } else {
        return room;
      }
    })
  };
  return state;
}

const reducer = combineReducers({
  user: userReducer,
  rooms: roomsReducer
})

export default reducer;