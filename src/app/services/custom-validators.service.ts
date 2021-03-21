import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';

export class CustomValidators {
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  static trueCheck(error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (control.value === false) {
        // if control is only of gaps return error
        return error;
      } else {
        return null;
      }
    };
  }

  static gapsOnly(error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      if (control.value.replace(/\s+/, '') === '') {
        // if control is only of gaps return error
        return error;
      } else {
        return null;
      }
    };
  }
}