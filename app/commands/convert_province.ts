import Command from '../libs/interfaces/command';

export default class ConvertProvince implements Command {
	excecute() {
		console.log('Test Command');
	}
}
