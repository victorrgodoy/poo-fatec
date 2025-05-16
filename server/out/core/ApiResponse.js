"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponse = void 0;
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["SUCCESS"] = 200] = "SUCCESS";
})(ResponseStatus || (ResponseStatus = {}));
class ApiResponse {
    reponseStatus;
    message;
    constructor(responseStatus, message) {
        this.reponseStatus = responseStatus;
        this.message = message;
    }
    prepare(res, data) {
        return res.status(this.reponseStatus).json({
            status: this.reponseStatus,
            message: this.message,
            data: data,
        });
    }
}
exports.default = ApiResponse;
class SuccessResponse extends ApiResponse {
    data;
    constructor(message, data) {
        super(ResponseStatus.SUCCESS, message);
        this.data = data;
    }
    send(res) {
        return super.prepare(res, this.data);
    }
}
exports.SuccessResponse = SuccessResponse;
