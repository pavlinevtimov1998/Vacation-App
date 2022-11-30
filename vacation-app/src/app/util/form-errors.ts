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

export function numbersLengthValidator(neededLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const numsToString = `${control.value}`;

    if (
      control.value &&
      (numsToString.length > neededLength ||
        numsToString?.length < neededLength)
    ) {
      return {
        length: true,
      };
    }

    return null;
  };
}
