import Command from '../libs/interfaces/command';
import fs from 'fs';
import path from 'path';
import District from '../models/district';

interface OldDistrictFormat {
	DISTRICT_ID: number;
	DISTRICT_CODE: string;
	DISTRICT_NAME: string;
	GEO_ID: number;
	PROVINCE_ID: number;
}

export default class ConvertDistrict implements Command {
	excecute() {
		const file = fs.readFileSync(path.join(path.resolve()) + '/dist/districts.json');
		const data: OldDistrictFormat[] = JSON.parse(file.toString());
		const districts: District[] = data.map(district => ({
			id: district.DISTRICT_ID,
			nameTh: district.DISTRICT_NAME,
			nameEn: district.DISTRICT_NAME,
			provinceId: district.PROVINCE_ID
		}));
		fs.writeFileSync(path.join(path.resolve()) + '/dist/districts_new.json', JSON.stringify(districts));
	}
}
