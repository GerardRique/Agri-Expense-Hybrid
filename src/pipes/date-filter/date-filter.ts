import { Pipe, PipeTransform } from '@angular/core';
import { Cycle } from '../../core/Models/Cycle';

/**
 * Generated class for the DateFilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'dateFilter',
  pure: false
})
export class DateFilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any) {

    console.log(value);
    return value;
    // return value.sort((a: Cycle, b: Cycle) => {
    //   return Date.parse(a.getDatePlanted()).valueOf() - Date.parse(b.getDatePlanted()).valueOf();
    // });
  }
}
