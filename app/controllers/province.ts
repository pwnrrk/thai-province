import Controller from "../libs/controller";
import { Http } from "../libs/http";
import { ProvinceDetail } from "../models/province";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export default class Province extends Controller {
  async all(http: Http) {
    const query = await getDocs(collection(getFirestore(), "provinces"));
    const provinces: ProvinceDetail[] = query.docs.map(
      (doc) => doc.data() as ProvinceDetail
    );
    return http.response.json(provinces);
  }
  async get(http: Http) {
    const id = parseInt(http.request.params.id);
    const q = query(
      collection(getFirestore(), "provinces"),
      where("id", "==", id)
    );
    const querySnapshot = await getDocs(q);
    const province: ProvinceDetail =
      querySnapshot.docs[0].data() as ProvinceDetail;
    return http.response.json(province);
  }
}
