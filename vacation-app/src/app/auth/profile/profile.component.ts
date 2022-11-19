import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, mergeMap, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IAccount } from 'src/app/shared/interfaces/account.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUser!: IAccount;
  profile!: IAccount;

  isOwnerOfProfile!: boolean;

  subscription!: Subscription;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params
      .pipe(
        mergeMap((params) => {
          const profileId = params['profileId'];

          return combineLatest([
            this.authService.currentUser$,
            this.authService.getProfileData$(profileId),
          ]);
        })
      )
      .subscribe({
        next: ([currentUser, profile]) => {
          this.isOwnerOfProfile = currentUser._id == profile._id;
          this.currentUser = currentUser;
          this.profile = profile;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
