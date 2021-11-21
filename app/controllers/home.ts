import Controller from "../libs/controller";
import { Http } from "../libs/http";

interface ApiData {
  name: string;
  description: string;
  version: string;
  author: string;
}

export default class Home extends Controller {
  index(http: Http) {
    const data: ApiData = {
      name: "Thailand Local Address",
      description:
        "Thailand local address API for general use such as form filling, autocomplete, etc.",
      version: "0.0.1",
      author: "R.Phuwanat",
    };
    return http.response.json(data);
  }
}
