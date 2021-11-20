import { getFirestore, setDoc, doc, Firestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import Command from "../libs/interfaces/command";
import fs from "fs";
import path from "path";
import { ProvinceDetail } from "../models/province";

export default class FirebaseSetup implements Command {
  db: Firestore;

  constructor() {
    this.initFirebase();
    this.db = getFirestore();
  }

  initFirebase() {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: "thai-province.firebaseapp.com",
      projectId: "thai-province",
      storageBucket: "thai-province.appspot.com",
      messagingSenderId: "804710319647",
      appId: "1:804710319647:web:e48107ee9a023f2489372a",
      measurementId: "G-8DZZQ0YDDK",
    };
    initializeApp(firebaseConfig);
  }

  async setData(
    collectionName: string,
    fileName: string,
    interfacesName: string
  ) {
    console.log(`Setting ${collectionName}`);
    const model = (await import(`../models/${interfacesName}`)).default;
    const file = fs.readFileSync(
      path.join(path.resolve()) + `/dist/${fileName}`
    );
    const data: typeof model[] = JSON.parse(file.toString());
    data.forEach(async (item) => {
      try {
        console.log(`Set ${item.nameEn || item.id}`);
        await setDoc(doc(this.db, collectionName, item.id.toString()), item, {
          merge: true,
        });
      } catch (error) {
        console.trace(error);
      }
    });
  }

  excecute() {
    // await this.setData("provinces", "provinces_new.json", "province");
    // await this.setData("districts", "districts_new.json", "district");
    // await this.setData(
    //   "sub_districts",
    //   "subDistricts_new.json",
    //   "sub_district"
    // );
    // await this.setData("zipcodes", "zipcodes_new.json", "zip_code");
    // await this.setData("geography", "geography_new.json", "geo_graphy");
    const file = fs.readFileSync(path.join(path.resolve(), "dist/merged.json"));
    const provinceDetails: ProvinceDetail[] = JSON.parse(file.toString());
    provinceDetails.forEach(async (province) => {
      try {
        await setDoc(
          doc(this.db, "provinces", province.id.toString()),
          province,
          {
            merge: true,
          }
        );
      } catch (error) {
        console.trace(error);
      }
    });
  }
}
