import {
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAILURE,
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAILURE,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILURE,
  CHANGE_EVENT_TO_DELETE,
  CHANGE_EVENTS_FILTER,
} from './types';

const initialState = {
  events: [],
  filter: 'All members',
  loading: false,
  eventToDelete: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload,
        loading: false,
        error: '',
      };

    case GET_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_EVENT_SUCCESS:
      return {
        ...state,
        events: [...state.events, action.payload],
        loading: false,
        error: '',
      };

    case ADD_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload),
        loading: false,
        error: '',
      };

    case DELETE_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CHANGE_EVENT_TO_DELETE:
      return {
        ...state,
        eventToDelete: action.payload,
      };

    case CHANGE_EVENTS_FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    default: return state;
  }
};

export default reducer;
