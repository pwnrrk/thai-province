import Command from "../libs/interfaces/command";
import fs from "fs";
import path from "path";
import ZipCode from "../models/zip_code";

export interface OldZipCodeFormat {
  ZIPCODE_ID: number;
  SUB_DISTRICT_CODE: string;
  PROVINCE_ID: string;
  DISTRICT_ID: string;
  SUB_DISTRICT_ID: string;
  ZIPCODE: string;
}

export default class ConvertZipcode implements Command {
  zipcodes: ZipCode[];

  constructor() {
    this.zipcodes = [];
  }

  isDuplicated(compareZipcode: string): boolean {
    const matches = this.zipcodes.filter(
      (zipcode) => zipcode.code === compareZipcode
    ).length;
    return matches > 0;
  }

  excecute() {
    const file = fs.readFileSync(
      path.join(path.resolve()) + "/dist/zipcodes.json"
    );
    const data: OldZipCodeFormat[] = JSON.parse(file.toString());
    let index = 0;
    data.forEach((zipcode) => {
      if (!this.isDuplicated(zipcode.ZIPCODE)) {
        index++;
        this.zipcodes.push({
          id: index,
          code: zipcode.ZIPCODE,
        });
      }
    });
    fs.writeFileSync(
      path.join(path.resolve()) + "/dist/zipcodes_new.json",
      JSON.stringify(this.zipcodes)
    );
  }
}
