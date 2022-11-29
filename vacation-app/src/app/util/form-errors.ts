import { FormGroup } from '@angular/forms';

export function errorHandler(group: FormGroup, value: string) {
  if (value.endsWith('ssword')) {
    return group.controls[value].touched && group.controls[value].errors;
  }

  return group.controls[value].touched && group.controls[value].errors;
}
