import loggedReducer from "./logged"
import openLoginDialogReducer from "./openLoginDialog"
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    isLogged: loggedReducer,
    isLoginDialogOpen: openLoginDialogReducer
})

export default allReducers