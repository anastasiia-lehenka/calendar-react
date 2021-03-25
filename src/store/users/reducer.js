import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  CHANGE_CURRENT_USER,
} from './types';

const initialState = {
  users: [],
  loading: false,
  currentUser: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: '',
      };

    case GET_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CHANGE_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    default: return state;
  }
};

export default reducer;
