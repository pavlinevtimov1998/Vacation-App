import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';


export function errorHandler(group: FormGroup, value: string) {
  if (value.endsWith('ssword')) {
    return group.controls[value].touched && group.controls[value].errors;
  }

  return group.controls[value].touched && group.controls[value].errors;
}


export function passwordsMismatch(password: AbstractControl): ValidatorFn {
  return (rePass: AbstractControl): ValidationErrors | null => {
    if (rePass.value !== password.value) {
      return {
        mismatch: true,
      };
    }

    return null;
  };
}
