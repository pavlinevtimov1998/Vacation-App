import { Component } from '@angular/core';

import { LoadingService } from 'src/app/loading.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent {
  get isLoading$() {
    return this.loadingService.isLoading$;
  }

  constructor(private loadingService: LoadingService) {}
}
