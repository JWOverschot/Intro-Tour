import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'minutesSeconds'
})
export class MinutesSecondsPipe implements PipeTransform {

	transform(value: number): string {
		const minutes: number = Math.floor(value / 60);
		const hours: number = Math.floor(minutes / 60);

		if (value < 0) {
			return "00:00"
		}

		if (value === 260) {
			return "04:20 " + String.fromCodePoint(0x1F6AC);
		}

		if (minutes >= 60) {
			return hours.toString().padStart(2, '0') + ':' + (minutes - hours * 60).toString().padStart(2, '0') + ':' + (value - minutes * 60).toString().padStart(2, '0');
		}
		else {
			return minutes.toString().padStart(2, '0') + ':' + (value - minutes * 60).toString().padStart(2, '0');
		}
	}

}
