import Controller from '../libs/controller';
import {Http} from '../libs/http';
import DistrictData from '../models/district';

export default class District extends Controller {
	all(http: Http) {
		const districts: DistrictData[] = [
			{
				id: 1,
				nameTh: 'ทุ่งครุ',
				nameEn: 'Thung Kru',
				provinceId: 1
			}
		];
		return http.response.json(districts);
	}	
}
