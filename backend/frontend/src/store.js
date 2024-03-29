import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { offerListReducer, offerDetailsReducer, offerCreateReducer, offerDeleteReducer, offerUpdateReducer } from './reducers/offerReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userRedusers'
import { messageCreateReducer, messageListReducer  } from './reducers/messageReducers'
import { requestCreateReducer,requestDetailsReducer,requestListReducer, requestDeleteReducer  } from './reducers/requestReducer'
const reducer = combineReducers({ 
  
  offerList:offerListReducer,
  offerDetails:offerDetailsReducer,
  offerCreate:offerCreateReducer,
  offerDelete:offerDeleteReducer,
  offerUpdate:offerUpdateReducer,

  userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateProfileReducer,

  messageList:messageListReducer,
  messageCreate:messageCreateReducer,

  requestList:requestListReducer,
  requestDetails:requestDetailsReducer,
  requestCreate:requestCreateReducer,
  deleteRequest: requestDeleteReducer,

 })

 const userInfoFromStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;

const initialState = {
	userLogin: { userInfo: userInfoFromStorage },
};


const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
