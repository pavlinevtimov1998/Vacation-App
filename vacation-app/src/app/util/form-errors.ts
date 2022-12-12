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

export function endDateValidator(
  startDate: AbstractControl<Date | null>
): ValidatorFn {
  return (endDate: AbstractControl<Date | null>): ValidationErrors | null => {
    if (startDate.value && endDate.value) {
      const differenceInTime =
        endDate.value.getTime() - startDate.value.getTime();

      const days = differenceInTime / (1000 * 3600 * 24);

      if (days == 0) {
        return {
          sameDayError: true,
        };
      } else if (days < 0) {
        return {
          sameDayError: true,
        };
      } else {
        return null;
      }
    }

    return null;
  };
}

export function startDateValidator(
  endDate: AbstractControl<Date | null>
): ValidatorFn {
  return (startDate: AbstractControl<Date | null>): ValidationErrors | null => {
    if (startDate.value && endDate.value) {
      const differenceInTime =
        endDate.value.getTime() - startDate.value.getTime();

      const days = differenceInTime / (1000 * 3600 * 24);

      if (days == 0) {
        return {
          sameDayError: true,
        };
      } else if (days < 0) {
        return {
          invalidDate: true,
        };
      } else {
        return null;
      }
    }

    return null;
  };
}
