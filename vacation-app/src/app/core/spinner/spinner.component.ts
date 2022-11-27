import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoadingService } from 'src/app/loading.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent {
  isLoading$ = this.loadingService.isLoading$;

  constructor(private loadingService: LoadingService) {}
}
