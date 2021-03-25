import { v4 as uuidv4 } from 'uuid';
import service from '../../services/Service';
import { addNotification } from '../notifications/actions';
import { notificationTypes } from '../../constants';
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

export const getEventsRequest = () => ({ type: GET_EVENTS_REQUEST });
export const getEventsSuccess = (payload) => ({ type: GET_EVENTS_SUCCESS, payload });
export const getEventsFailure = (payload) => ({ type: GET_EVENTS_FAILURE, payload });
export const addEventRequest = () => ({ type: ADD_EVENT_REQUEST });
export const addEventSuccess = (payload) => ({ type: ADD_EVENT_SUCCESS, payload });
export const addEventFailure = (payload) => ({ type: ADD_EVENT_FAILURE, payload });
export const deleteEventRequest = () => ({ type: DELETE_EVENT_REQUEST });
export const deleteEventSuccess = (payload) => ({ type: DELETE_EVENT_SUCCESS, payload });
export const deleteEventFailure = (payload) => ({ type: DELETE_EVENT_FAILURE, payload });
export const changeEventToDelete = (payload) => ({ type: CHANGE_EVENT_TO_DELETE, payload });
export const changeEventsFilter = (payload) => ({ type: CHANGE_EVENTS_FILTER, payload });

export const getEvents = () => async (dispatch) => {
  dispatch(getEventsRequest());

  try {
    const response = await service.getEvents();
    dispatch(getEventsSuccess(response));
    dispatch(addNotification({ id: uuidv4(), type: notificationTypes.success, text: 'Events loaded' }));
  } catch (err) {
    dispatch(getEventsFailure(err));
    dispatch(addNotification({ id: uuidv4(), type: notificationTypes.error, text: `Failed to get event. ${err}` }));
  }
};

export const addEvent = (payload) => async (dispatch) => {
  dispatch(addEventRequest());

  try {
    const response = await service.createEvent(payload);
    dispatch(addEventSuccess(response));
    dispatch(addNotification({ id: uuidv4(), type: notificationTypes.success, text: 'Event created' }));
  } catch (err) {
    dispatch(addEventFailure(err));
    dispatch(addNotification({ id: uuidv4(), type: notificationTypes.error, text: `Failed to create event. ${err}` }));
  }
};

export const deleteEvent = (payload) => async (dispatch) => {
  dispatch(deleteEventRequest());

  try {
    await service.deleteEvent(payload);
    dispatch(deleteEventSuccess(payload));
    dispatch(addNotification({ id: uuidv4(), type: notificationTypes.success, text: 'Event deleted' }));
  } catch (err) {
    dispatch(deleteEventFailure(err));
    dispatch(addNotification({ id: uuidv4(), type: notificationTypes.error, text: `Failed to delete event. ${err}` }));
  }
};
