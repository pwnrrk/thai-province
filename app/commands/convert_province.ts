import Command from '../libs/interfaces/command';
import fs from 'fs';
import path from 'path';
import Province from '../models/province';

interface OldProvinceFormat {
	PROVINCE_ID: number;
  PROVINCE_CODE: string
  PROVINCE_NAME: string
  GEO_ID: number
}

export default class ConvertProvince implements Command {
	excecute() {
		const file = fs.readFileSync(path.join(path.resolve()) + '/dist/provinces.json');
		const data: OldProvinceFormat[] = JSON.parse(file.toString());
		const provinces: Province[] = data.map(province => (
			{
				id: province.PROVINCE_ID,
				nameTh: province.PROVINCE_NAME,
				nameEn: province.PROVINCE_NAME,
				geoId: province.GEO_ID
			}
		));
		fs.writeFileSync(path.join(path.resolve()) + '/dist/provinces_new.json', JSON.stringify(provinces));
	}
}
