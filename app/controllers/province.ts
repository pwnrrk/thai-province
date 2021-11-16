import Controller from '../libs/controller';
import {Http} from '../libs/http';
import ProvinceData from '../models/province';

export default class Province extends Controller {
	all(http: Http) {
		const provices: ProvinceData[] = [
			{
				id: 1,
				nameTh: 'กรุงเทพมหานคร',
				nameEn: 'Bangkok',
			},
			{
				id: 2,
				nameTh: 'สมุทรปราการ',
				nameEn: 'Samut Prakan'
			}
		];
		return http.response.json(provices);
	}
}
