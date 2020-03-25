import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, Validator } from '@angular/forms';

@Directive({
  selector: '[appDurationValidation]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: DurationValidationDirective,
    multi: true
  }]
})
export class DurationValidationDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl) : {[key: string]: any} | null {
    if (control.value && (control.value < 0 || control.value > 59) ) {
      return { 'durationInvalid': true }; // return object if validation fails
    }
    return null; // return nothing if validation passes
  }  

}
