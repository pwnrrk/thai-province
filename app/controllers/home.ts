import Controller from "../libs/controller";
import { Http } from "../libs/http";
import AppData from "../models/app_data";
import SearchResult from "../models/search_result";
import { searchProvinces } from "../utilities/search";
export default class Home extends Controller {
  index(http: Http) {
    const data: AppData = {
      name: "Thailand Local Address",
      description:
        "Thailand local address API for general use such as form filling, autocomplete, etc.",
      version: "0.0.1",
      author: "R.Phuwanat",
    };
    return http.response.json(data);
  }
  async search(http: Http) {
    const queryText = http.request.query.query;
    if (!queryText) return http.response.status(404);
    const searchResults = await searchProvinces(queryText.toString());
    if (!searchResults) return { results: 0, data: [] };
    const searchResult: SearchResult = {
      results: searchResults.length,
      data: searchResults,
    };
    return http.response.json(searchResult);
  }
}
