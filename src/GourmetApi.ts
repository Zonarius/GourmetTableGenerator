import { Cookie } from "request";
import * as request from "request";
import * as requestPromise from "request-promise-native";

const baseUrl = 'https://alaclick.gourmet.at';

export class GourmetApi {
  private jar: request.CookieJar;
  private req: request.RequestAPI<requestPromise.RequestPromise, requestPromise.RequestPromiseOptions, request.RequiredUriUrl>;

  constructor() {
    this.jar = request.jar();
    this.req = requestPromise.defaults({ baseUrl, jar: this.jar });
  }

  public login(login: string, password: string): Promise<any> {
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
