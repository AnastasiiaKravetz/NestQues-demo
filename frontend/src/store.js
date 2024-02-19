import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { offerListReducer, offerDetailsReducer, offerCreateReducer, offerDeleteReducer } from './reducers/offerReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userRedusers'

const reducer = combineReducers({ 
  
  offerList: offerListReducer,
  offerDetails:offerDetailsReducer,
  offerCreate:offerCreateReducer,
  offerDelete:offerDeleteReducer,

  userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateProfileReducer,

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
