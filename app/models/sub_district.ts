import ZipCode from './zip_code';

interface SubDistrict {
	id: number
	nameTh: string
	nameEn: string
	districtId: number
	zipCodeId: number
}

export interface SubDistrictDetail extends SubDistrict {
	zipcode: ZipCode
}

export default SubDistrict;
