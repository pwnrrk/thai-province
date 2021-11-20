import Command from "../libs/interfaces/command";
import fs from "fs";
import path from "path";
import Province, { ProvinceDetail } from "../models/province";
import District, { DistrictDetail } from "../models/district";
import SubDistrict, { SubDistrictDetail } from "../models/sub_district";
import ZipCode from "../models/zip_code";
export default class MergeData implements Command {
  excecute() {
    const provincesFile = fs.readFileSync(
      path.join(path.resolve(), "dist/provinces_new.json")
    );
    const districtFile = fs.readFileSync(
      path.join(path.resolve(), "dist/districts_new.json")
    );
    const subDistrictFile = fs.readFileSync(
      path.join(path.resolve(), "dist/subDistricts_new.json")
    );
    const zipcodeFile = fs.readFileSync(
      path.join(path.resolve(), "dist/zipcodes_new.json")
    );

    const provinces: Province[] = JSON.parse(provincesFile.toString());
    const districts: District[] = JSON.parse(districtFile.toString());
    const subDistricts: SubDistrict[] = JSON.parse(subDistrictFile.toString());
    const zipcodes: ZipCode[] = JSON.parse(zipcodeFile.toString());
    const subDistrictsDetail: SubDistrictDetail[] = subDistricts.map(
      (subDistrict) => {
        return {
          ...subDistrict,
          zipcode: zipcodes.find(
            (zipcode) => zipcode.id == subDistrict.zipCodeId
          ) as ZipCode,
        };
      }
    );

    const provincesDetail: ProvinceDetail[] = provinces.map((province) => {
      const districtsInProvince = districts.filter(
        (district) => district.provinceId == province.id
      );
      const districtDetails: DistrictDetail[] = districtsInProvince.map(
        (district) => ({
          ...district,
          sub_districts: subDistrictsDetail.filter(
            (subDistrict) => subDistrict.districtId == district.id
          ) as SubDistrictDetail[],
        })
      );
      return {
        ...province,
        districts: districtDetails,
      };
    });

    fs.writeFileSync(
      path.join(path.resolve(), "dist/merged.json"),
      JSON.stringify(provincesDetail)
    );
  }
}
