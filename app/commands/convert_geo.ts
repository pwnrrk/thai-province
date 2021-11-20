import Command from "../libs/interfaces/command";
import fs from "fs";
import path from "path";
import GeoGraphy from "../models/geo_graphy";

interface OldGeoFormat {
  GEO_ID: number;
  GEO_NAME: string;
}

export default class ConvertGeo implements Command {
  excecute() {
    const file = fs.readFileSync(
      path.join(path.resolve()) + "/dist/geography.json"
    );
    const data: OldGeoFormat[] = JSON.parse(file.toString());
    const geographs: GeoGraphy[] = data.map((geo) => ({
      id: geo.GEO_ID,
      nameTh: geo.GEO_NAME,
      nameEn: geo.GEO_NAME,
    }));
    fs.writeFileSync(
      path.join(path.resolve()) + "/dist/geography_new.json",
      JSON.stringify(geographs)
    );
  }
}
