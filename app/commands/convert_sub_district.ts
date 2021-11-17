import Command from '../libs/interfaces/command';
import fs from 'fs';
import path from 'path';
import SubDistrict from '../models/sub_district';
import { OldZipCodeFormat } from './convert_zipcode';
import ZipCode from '../models/zip_code';
interface OldSubDistrictFormat {
	SUB_DISTRICT_ID: number;
	SUB_DISTRICT_CODE: string;
	SUB_DISTRICT_NAME: string;
	DISTRICT_ID: number;
	PROVINCE_ID: number;
	GEO_ID: number;
}

export default class ConvertSubDistrict implements Command {

	getAllOldZipcode(): OldZipCodeFormat[] {
		const file = fs.readFileSync(path.join(path.resolve()) + '/dist/zipcodes.json');
		return JSON.parse(file.toString()) as OldZipCodeFormat[];
	}

	getAllNewZipcode(): ZipCode[] {
		const file = fs.readFileSync(path.join(path.resolve()) + '/dist/zipcodes_new.json');
		return JSON.parse(file.toString()) as ZipCode[];
	}

	excecute() {
		const file = fs.readFileSync(path.join(path.resolve()) + '/dist/subDistricts.json');
		const data: OldSubDistrictFormat[] = JSON.parse(file.toString());
		const oldZipcodes: OldZipCodeFormat[] = this.getAllOldZipcode();
		const newZipcodes: ZipCode[] = this.getAllNewZipcode();
		const subDistricts: SubDistrict[] = data.map(subDistrict => {
			const fetched: OldZipCodeFormat = oldZipcodes.find(zip => parseInt(zip.SUB_DISTRICT_ID) == subDistrict.SUB_DISTRICT_ID) as OldZipCodeFormat;
			const zipcodeId: number = fetched? (newZipcodes.find(zip => zip.code == fetched.ZIPCODE) as ZipCode).id : 0;
			return ({
				id: subDistrict.SUB_DISTRICT_ID,
				nameTh: subDistrict.SUB_DISTRICT_NAME,
				nameEn: subDistrict.SUB_DISTRICT_NAME,
				districtId: subDistrict.DISTRICT_ID,
				zipCodeId: zipcodeId
			});
		});
		fs.writeFileSync(path.join(path.resolve()) + '/dist/subDistricts_new.json', JSON.stringify(subDistricts));
	}
}
