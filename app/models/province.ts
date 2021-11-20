import { DistrictDetail } from "./district";

interface Province {
  id: number;
  nameTh: string;
  nameEn: string;
  geoId: number;
}

export interface ProvinceDetail extends Province {
  districts: DistrictDetail[];
}

export default Province;
