const ServerStatusCode = {
    NOT_EXIST_CODE: 403,
    UNAUTHORIZED: 401,
    SUCCESS_CODE: 200,
    SERVER_ERROR: 500,
    RECORD_NOTEXIST: 502,
    INVALID_CRED: 403,
    BAD_REQUEST: 400,
    PRECONDION_FAILED: 412,
    UNPROCESSABLE: 422,
};

const errorResponse = {
    ALREADY_EXIST: 'Record already exist',
    NOT_FOUND: 'User not found',
    UNAUTHORISED: 'Unauthorised',
    MISSING_CREDENTIALS: 'Missing Credentials',
    SOMETHING_WRONG: 'Something went wrong!',
    BAD_REQUEST: 'Bad Request.',
    INTERNAL_SERVER_ERROR: 'Internal Server Error.',
    USER_DOESNT_EXIST: 'User doesnt exist',
    NO_TOKEN: 'No token Provided',
    RECORD_NOEXIST: 'No Records found',
    NOT_VALID: 'Not valid',
    NOT_REGISTER: 'User Not Register',
    USER_ALREADY_REGISTER: 'User already registered',
    USERNAME_INVALID: 'Username is invalid',
    PASSWORD_INVALID: 'Password is invalid',
    INVALID_TOKEN: 'Invalid Token',
};

const CrudMessage = {
    ADD_SUCCESS: 'Record added successfully',
    RECORD_FETCH: 'Record fetch successfully',
    RECORD_NOT_FETCH: 'Record does not exist',
    UPDATE_SUCCESS: 'Updated successfully',
    UPDATE_FAILURE: 'Update failed',
    DELETE_SUCCESS: 'Deleted successfully',
};

module.exports = {
    errorResponse,
    ServerStatusCode,
    CrudMessage
}