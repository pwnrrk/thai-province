import Command from '../libs/interfaces/command';
import fs from 'fs';
import path from 'path';
//import District from '../models/district';

export default class ConvertDistrict implements Command {
	excecute() {
		const file = fs.readFileSync(path.join(path.resolve()) + '/dist/districts.json');
		const data = JSON.parse(file.toString());
		console.log(data);
	}
}
