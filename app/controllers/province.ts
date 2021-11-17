import Controller from '../libs/controller';
import {Http} from '../libs/http';
import ProvinceData from '../models/province';
import fs from 'fs';
import path from 'path';

export default class Province extends Controller {
	all(http: Http) {
		const file = fs.readFileSync(path.join(path.resolve()) + '/dist/provinces_new.json');
		const provices: ProvinceData[] = JSON.parse(file.toString()); 
		return http.response.json(provices);
	}
}
