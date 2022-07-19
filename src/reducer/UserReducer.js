const UserReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: action.users
      }    
    case "GET_LOGGED_USER":
      return {
        ...state,
        loggedUser: action.loggedUser
      }    
    case "IS_ADMIN":
      return {
        ...state,
        isAdmin: action.isAdmin
      }
    case "LOGOUT":
      return {
        ...state,
        loggedUser: action.loggedUser,
        isAdmin: action.isAdmin
      }
  
    default:
      return state
  }
}

export default UserReducer