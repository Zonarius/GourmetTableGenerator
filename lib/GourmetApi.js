"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const requestPromise = require("request-promise-native");
const baseUrl = 'https://alaclick.gourmet.at';
class GourmetApi {
    constructor() {
        this.jar = request.jar();
        this.req = requestPromise.defaults({ baseUrl, jar: this.jar });
    }
    login(login, password) {
        return this.req.post('/frontend4', {
            formData: {
                login,
                password,
                btnSubmit: 1,
                RADIO_REDIRECT_TIMETRACKER: 0,
            }
        });
    }
}
exports.GourmetApi = GourmetApi;
