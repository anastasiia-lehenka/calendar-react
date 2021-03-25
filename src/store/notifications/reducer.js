import { ADD_NOTIFICATION } from './types';

const initialState = { notifications: [] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };

    default: return state;
  }
};

export default reducer;
