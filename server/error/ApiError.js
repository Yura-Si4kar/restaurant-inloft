class ApiError {
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }

    static notFound(message) {
        return new ApiError(404, message);
    }

    static internal(message) {
        return new ApiError(500, message);
    }
}

module.exports = ApiError;