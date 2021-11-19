import { SubDistrictDetail } from './sub_district';

interface District {
	id: number
	nameTh: string
	nameEn: string
	provinceId: number
}

export interface DistrictDetail extends District {
	sub_districts: SubDistrictDetail[]
}

export default District;
