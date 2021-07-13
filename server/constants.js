const definedErrors = {
    CONNECTION_ERROR:{
        name: "CONNECTION_ERROR",
        message: "Error occured while connecting."
    },
    INVALID_CREDENTIALS:{
        name: "INVALID_CREDENTIALS",
        message: "Credentials are not valid."
    },
    JWT_TOKEN_ERROR:{
        name: "JWT_TOKEN_ERROR",
        message: "Invalid token or token expired."
    }
}
const cookieExpiresIn = 1; // 1 day
module.exports = {
    definedErrors,
    cookieExpiresIn
};