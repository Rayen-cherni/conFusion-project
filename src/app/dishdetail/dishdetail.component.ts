import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Dish } from '../menu/shared/dish';
import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../menu/shared/comment';

// For the animations
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    trigger('visibility', [
      state('shown', style({
        transform: 'scale(1.0)',
        opacity: 1
      })),
      state('hidden', style({
        transform: 'scale(0.5)',
        opacity: 0
      })),
      transition('* => *', animate('0.5s ease-in-out'))
    ])
  ]
})

export class DishdetailComponent implements OnInit {


  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  CommentForm: FormGroup;
  //the data model
  CommentFormResult: Comment;

  // Error
  errMess: string;

  // Put 
  dishcopy: Dish;

  //Animation 
  visibility = 'shown';

  @ViewChild('fform2') CommentFormDirective;

  CommentformErrors = {
    'author': '',
    'comment': ''
  };

  CommentvalidationMessages = {
    'author': {
      'required': 'author is required.',
      'minlength': 'author must be at least 2 characters long.',
      'maxlength': 'author cannot be more than 25 characters long.'
    },
    'comment': {
      'required': 'Comment is required.',
    },
  };


  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('baseURL') public baseURL
  ) {

    this.createCommentForm();

  }

  ngOnInit(): void {

    //const id = +this.route.snapshot.params['id'];
    // this.dishservice.getDish(id)

    this.route.params.pipe(switchMap((params: Params) => {this.visibility ='hidden'; return this.dishservice.getDish(params['id']); }))


      //Si on veut utiliser le promises on utilise .then mais dans le cas ou on veut utiliser observable on utilise .subscribe
      //.then( (dish) => this.dish = dish);
      .subscribe((dish) => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
        errmess => this.errMess = <any>errmess
      );


    this.dishservice.getDishIds()
      .subscribe((dishIds) => this.dishIds = dishIds)
  }

  setPrevNext(dishId: string) {

    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];

  }

  goBack(): void {
    this.location.back();
  }

  createCommentForm() {

    this.CommentForm = this.fb.group({

      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: ['5'],
      comment: ['', [Validators.required]],
      date: ['']
    });

    this.CommentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  formatLabel(value: number) {
    return value;

  }

  //To display the error messages
  onValueChanged(data?: any) {
    if (!this.CommentForm) { return; }

    const form = this.CommentForm;
    for (const field in this.CommentformErrors) {
      if (this.CommentformErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.CommentformErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.CommentvalidationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.CommentformErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    var j1 = new Date();
    var n = j1.toISOString();
    this.CommentFormResult = this.CommentForm.value;
    this.CommentFormResult.date = n;
    //console.log(j1);
    console.log(n);
    console.log(this.CommentFormResult);
    this.dishcopy.comments.push(this.CommentFormResult);
    this.dishservice.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
        errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });
    this.CommentForm.reset({
      author: '',
      rating: '5',
      comment: '',
      date: '',
    }
    );

    this.CommentFormDirective.resetForm();
  }


}
