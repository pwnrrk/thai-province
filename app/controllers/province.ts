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
import { filterDistricts } from "../utilities/dataQuery";
import { DistrictDetail } from "../models/district";

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
    const province: ProvinceData = querySnapshot.docs[0].data() as ProvinceData;
    const districts: DistrictDetail[] = await filterDistricts(id);
    return http.response.json({
      ...province,
      districts,
    });
  }
}
