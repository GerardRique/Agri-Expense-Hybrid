import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, args: any) {
    if(args === undefined){
      return value;
    }
    return value.filter((name) => {
      return name.firstName.toLowerCase().includes(args.toLowerCase()) || name.lastName.toLowerCase().includes(args.toLowerCase());
    });
  }
}
