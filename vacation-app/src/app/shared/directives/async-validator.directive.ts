import { Directive, Attribute } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AgencyService } from 'src/app/agency/agency.service';
import { UserService } from 'src/app/user/user.service';

@Directive({
  selector: '[appAsyncValidator]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: AsyncValidatorDirective,
      multi: true,
    },
  ],
})
export class AsyncValidatorDirective implements AsyncValidator {
  constructor(
    private agencyService: AgencyService,
    private userService: UserService,
    @Attribute('prop') public prop: string
  ) {}

  validate(
    control: AbstractControl<string>
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const obs$ =
      this.prop == 'username'
        ? this.userService.isUnique$(control.value)
        : this.agencyService.isUnique$(this.prop, control.value);

    return obs$.pipe(
      map((isExisting) => {
        if (isExisting) {
          return {
            isExisting,
          };
        }
        return null;
      })
    );
  }
}
