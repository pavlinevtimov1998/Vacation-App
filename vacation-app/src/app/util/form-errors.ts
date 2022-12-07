import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function errorHandler(group: FormGroup, value: string) {
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

export function imageTypeValidator(
  control: AbstractControl<File[] | null>
): ValidationErrors | null {
  if (control.value) {
    for (let i = 0; i < control.value.length; i++) {
      const img = control.value[i];

      if (!img.type.includes('png') && !img.type.includes('jpeg')) {
        control.patchValue(null);
        return {
          imagesType: true,
        };
      }
    }
  }
  return null;
}

export function dateValidator(
  startDate: AbstractControl<Date | null>
): ValidatorFn {
  return (endDate: AbstractControl<Date | null>): ValidationErrors | null => {
    const minDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );

    if (startDate.value && endDate.value) {
      console.log(minDate, startDate.value);

      if (minDate > startDate.value) {
        return {
          invalidStartDate: true,
        };
      }
      const differenceInTime =
        endDate.value.getTime() - startDate.value.getTime();

      const days = differenceInTime / (1000 * 3600 * 24);
      if (days == 0) {
        return {
          sameDayError: true,
        };
      } else {
        return null;
      }
    } else {
      return {
        required: true,
      };
    }
  };
}
