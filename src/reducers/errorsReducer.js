import {INCORRECT_LOGIN_OR_PASSWORD, 
        USERNAME_IS_ALREADY_TAKEN,
        ALL_FIELDS_ARE_REQUIRED,
        PASSWORDS_SHOULD_BE_SAME,
        INCORRECT_VALUE_LENGTH,
        MIN_LENGTH,
        LOGIN_AND_PASSWORD_ARE_CORRECT,
        USERNAME_IS_RIGHT,
        ALL_FIELDS_ARE_FILLED,
        PASSWORDS_ARE_SAME,
        VALUE_LENGTH_IS_CORRECT} from './../constants/constants'

const errorsReducer = (state = {}, action) => {
    switch(action.type) {
        //Errors
        case INCORRECT_LOGIN_OR_PASSWORD:
            return Object.assign({}, state, {
                loginWarning:"Login or password is incorrect!"
            })
        case USERNAME_IS_ALREADY_TAKEN:
            return Object.assign({}, state, {
                usernameWarning:"Account with such username is already exist!"
            })
        case ALL_FIELDS_ARE_REQUIRED:
            return Object.assign({}, state, {
                fieldsWarning:"All fields are required!"
            })
        case PASSWORDS_SHOULD_BE_SAME:
            return Object.assign({}, state, {
                passwordWarning:"Passwords should be same!"
            })
        case INCORRECT_VALUE_LENGTH:
            return Object.assign({}, state, {
                valueLengthWarning:`All fields should be at least ${MIN_LENGTH} symbols length!`
            })
        //Success
        case LOGIN_AND_PASSWORD_ARE_CORRECT:
            return Object.assign({}, state, {
                loginWarning:""
            })
        case USERNAME_IS_RIGHT:
            return Object.assign({}, state, {
                usernameWarning:""
            })
        case ALL_FIELDS_ARE_FILLED:
            return Object.assign({}, state, {
                fieldsWarning:""
            })
        case PASSWORDS_ARE_SAME:
            return Object.assign({}, state, {
                passwordWarning:""
            })
        case VALUE_LENGTH_IS_CORRECT:
            return Object.assign({}, state, {
                valueLengthWarning:""
            })
        default: 
            return state
    }
}

export default errorsReducer