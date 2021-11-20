import Controller from "../libs/controller";
import { Http } from "../libs/http";
import DistrictData from "../models/district";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";

export default class District extends Controller {
  async all(http: Http) {
    const q = http.request.query.provinceId
      ? query(
          collection(getFirestore(), "districts"),
          where(
            "provinceId",
            "==",
            parseInt(http.request.query.provinceId.toString())
          )
        )
      : undefined;
    const querySnapshot = q
      ? await getDocs(q)
      : await getDocs(collection(getFirestore(), "districts"));
    const districts: DistrictData[] = querySnapshot.docs.map(
      (doc) => doc.data() as DistrictData
    );
    return http.response.json(districts);
  }
}
