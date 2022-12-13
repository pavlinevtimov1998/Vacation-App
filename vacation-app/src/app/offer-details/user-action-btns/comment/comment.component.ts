import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MessageBusService } from 'src/app/message-bus.service';
import { OfferService } from 'src/app/offer/offer.service';
import { IComment } from 'src/app/shared/interfaces';
import { MessageType } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input() offerId!: string;
  @Output() addedComment = new EventEmitter<IComment>();
  @Output() close = new EventEmitter();

  commentForm!: FormGroup;

  isLoading = false;

  subscription$!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private offerService: OfferService,
    private messageBus: MessageBusService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      content: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100),
      ]),
    });
  }

  commentHandler() {
    if (this.commentForm.invalid) {
      return this.commentForm.markAllAsTouched();
    }

    const body = this.commentForm.value;
    this.isLoading = true;

    this.subscription$ = this.offerService
      .addComment$(body, this.offerId)
      .subscribe({
        next: (comment) => {
          this.addedComment.emit(comment);

          this.commentForm.reset();

          this.messageBus.addMessage({
            message: 'Successfully added comment!',
            type: MessageType.Success,
          });
          this.close.emit();
        },
        error: (err) => {
          this.router.navigate(['/']);
        },
      });
  }

  closeCommentContainer() {
    this.close.emit();
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }
}
