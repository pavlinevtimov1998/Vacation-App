import { Attribute, Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appPasswordsValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordsValidatorDirective,
      multi: true,
    },
  ],
})
export class PasswordsValidatorDirective implements Validator {
  private get isReverse() {
    if (!this.reverse) return false;
    return this.reverse === 'true' ? true : false;
  }

  constructor(
    @Attribute('appPasswordsValidator') public password: string,
    @Attribute('reverse') public reverse: string
  ) {}

  validate(control: AbstractControl): { [key: string]: any } | null {
    let rePassword = control;

    let password = control.root.get(this.password);

    if (password && rePassword.value !== password.value && !this.isReverse) {
      return {
        mismatch: true,
      };
    }

    if (password && rePassword.value !== password.value && this.isReverse) {
      password.setErrors({ mismatch: true });
    }

    if (
      !password?.errors &&
      rePassword.value === password?.value &&
      !this.isReverse
    ) {
      password?.setErrors(null);
    }

    if (
      password?.value &&
      rePassword.value === password.value &&
      this.isReverse
    ) {
      password.setErrors(null);
    }

    return null;
  }
}
