import {
  getFirestore,
  collection,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import { ProvinceDetail } from "../models/province";

export async function requestFirebaseHandler(fun: CallableFunction) {
  try {
    const data: QuerySnapshot = await fun();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function searchProvinces(queryText: string) {
  const { data, error } = await requestFirebaseHandler(
    async () => await getDocs(collection(getFirestore(), "provinces"))
  );
  if (error) return null;
  if (!data) return null;
  const provinces: ProvinceDetail[] = data.docs.map(
    (doc) => doc.data() as ProvinceDetail
  );
  const filteredProvinces = provinces.filter(
    (province) =>
      province.nameTh.includes(queryText) || province.nameEn.includes(queryText)
  );
  return filteredProvinces;
}
