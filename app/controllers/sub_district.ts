import Controller from '../libs/controller';
import {Http} from '../libs/http';
import SubDistrictData from '../models/sub_district';
export default class SubDistrict extends Controller {
	all(http: Http) {
		const sub_districts: SubDistrictData[] = [
			{
				id: 1,
				nameTh: 'ทุ่งครุ',
				nameEn: 'Thung Kru',
				districtId: 1,
				zipCodeId: 1
			}
		];
		return http.response.json(sub_districts);
	}
}
