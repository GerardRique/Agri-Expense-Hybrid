import { FormControl } from '@angular/forms';

export function RangeValidator(control: FormControl) {
    if(isNaN(control.value)){
        return {
          "not a number": true
        };
    }

    if(control.value < 1){
        return {
          "price cannot be less than 0": true
        };
    }

    return null;

}