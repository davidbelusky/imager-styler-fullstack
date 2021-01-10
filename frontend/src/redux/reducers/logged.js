const loggedReducer = (state = false,action) => {
    switch(action.type){
        case "LogIn":
            return true
        case "LogOut":
            return false
        default:
            return false
    }
}

export default loggedReducer