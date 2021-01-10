const openLoginDialogReducer = (state = false,action) => {
    switch(action.type){
        case "OpenLoginDialog":
            return true
        case "CloseLoginDialog":
            return false
        default:
            return false
    }
}

export default openLoginDialogReducer