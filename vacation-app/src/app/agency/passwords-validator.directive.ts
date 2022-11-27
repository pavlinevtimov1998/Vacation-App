import { Attribute, Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appPasswordsValidator][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PasswordsValidatorDirective),
      multi: true,
    },
  ],
})
export class PasswordsValidatorDirective {
  private get isReverse() {
    if (!this.reverse) return false;
    return this.reverse === 'true' ? true : false;
  }

  constructor(
    @Attribute('appPasswordsValidator') public password: string,
    @Attribute('reverse') public reverse: string
  ) {}

  validate(control: AbstractControl): { [key: string]: any } | null {
    let rePassword = control.value;

    let password = control.root.get(this.password);

    if (password && rePassword !== password.value && !this.isReverse) {
      return {
        mismatch: true,
      };
    }

    if (password && rePassword === password.value && !this.isReverse) {
      password.setErrors(null);
    }

    if (password && rePassword === password.value && this.isReverse) {
      password.setErrors(null);
    }

    if (password && rePassword !== password.value && this.isReverse) {
      return {
        mismatch: true,
      };
    }

    return null;
  }
}
