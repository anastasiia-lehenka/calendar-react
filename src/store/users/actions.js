import { v4 as uuidv4 } from 'uuid';
import service from '../../services/Service';
import { addNotification } from '../notifications/actions';
import { notificationTypes } from '../../constants';
import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  CHANGE_CURRENT_USER,
} from './types';

export const getUsersRequest = () => ({ type: GET_USERS_REQUEST });
export const getUsersSuccess = (payload) => ({ type: GET_USERS_SUCCESS, payload });
export const getUsersFailure = (payload) => ({ type: GET_USERS_FAILURE, payload });
export const changeCurrentUser = (payload) => ({ type: CHANGE_CURRENT_USER, payload });

export const getUsers = () => async (dispatch) => {
  dispatch(getUsersRequest());

  try {
    const response = await service.getUsers();
    dispatch(getUsersSuccess(response));
    dispatch(addNotification({ id: uuidv4(), type: notificationTypes.success, text: 'Users loaded' }));
  } catch (err) {
    dispatch(getUsersFailure(err));
    dispatch(addNotification({ id: uuidv4(), type: notificationTypes.error, text: `Failed to load users. ${err}` }));
  }
};
