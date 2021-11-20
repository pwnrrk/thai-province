import { getDocs, where, getFirestore, collection, query } from 'firebase/firestore';
import ZipCode from '../models/zip_code';
import SubDistrict, {SubDistrictDetail} from '../models/sub_district';
import District, {DistrictDetail} from '../models/district';
import Province from '../models/province';

export async function filterDistricts(provinceId: number) {
	const db = getFirestore();
	const districtQuery = query(
		collection(db, 'districts'),
		where('provinceId', '==', provinceId)
	);
	const districtsSnapShot = await getDocs(districtQuery);	
	const subDistrictsSnapshot = await getDocs(collection(db, 'sub_districts'));
	const zipcodeSnapshot = await getDocs(collection(db, 'zipcodes'));
	const zipcodes: ZipCode[] = zipcodeSnapshot.docs.map(doc => doc.data() as ZipCode);
	const sub_districts: SubDistrictDetail[] = subDistrictsSnapshot.docs.map(doc => (
		{
			...doc.data() as SubDistrict,
			zipcode: zipcodes.find(zipcode => zipcode.id == doc.get('zipCodeId')) as ZipCode
		}
	));
	const districts: DistrictDetail[] = districtsSnapShot.docs.map(doc => (
		{
			...doc.data() as District,
			sub_districts: sub_districts.filter(sub_district => sub_district.districtId == doc.get('id'))	
		}
	));
	return districts;
}
export async function search(queryText: string) {
	const db = getFirestore();
	const q = query(
		collection(db, 'provinces'),
		where('nameTh', 'array-contains' ,queryText)
	);
	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map(doc => doc.data() as Province);
}
