import Controller from "../libs/controller";
import { Http } from "../libs/http";
import SubDistrictData from "../models/sub_district";
import {
  getFirestore,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";

export default class SubDistrict extends Controller {
  async all(http: Http) {
    const q = http.request.query.districtId
      ? query(
          collection(getFirestore(), "sub_districts"),
          where(
            "districtId",
            "==",
            parseInt(http.request.query.districtId.toString())
          )
        )
      : undefined;
    const querySnapshot = q
      ? await getDocs(q)
      : await getDocs(collection(getFirestore(), "sub_districts"));
    const sub_districts: SubDistrictData[] = querySnapshot.docs.map(
      (doc) => doc.data() as SubDistrictData
    );
    return http.response.json(sub_districts);
  }
}
