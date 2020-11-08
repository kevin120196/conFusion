import { Component, OnInit, Input, ViewChild,Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { DishService } from "../services/dish.service";
import { switchMap } from "rxjs/operators";
import { FormBuilder,FormGroup,Validators } from "@angular/forms";
import { Comment } from "../shared/comment";
import { invalid } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
    
  dish:Dish;
  dishIds:string[];
  prev:string;
  next:string;

  commentForm:FormGroup;
  comment:Comment[]=[];
  @ViewChild('cform') commentFormDirective;

  formErrors={
    'author':'',
    'comment':''
  }

  validationMessages={
    'author':{
      'required':'Author Name is required',
      'minlength':'Author Name must be at least 2 characters long.'
    },

    'comment':{
      'required':'Comment is required',
      'minlength':'Comment must be at least 2 characters long.'
    }
  }

  constructor(private dishService:DishService,
    private location:Location,
    private route:ActivatedRoute,
    private fb:FormBuilder,
    @Inject('BaseURL') private BaseURL ) {
    this.createForm();
  }

  ngOnInit(): void {

    this.dishService.getDishIds()
      .subscribe((dishIds) => this.dishIds = dishIds);
    //const id = this.route.snapshot.params['id'];
/*     this.dishService.getDish(id)
      .subscribe(dishes => this.dish=dishes); */
    this.route.params
      .pipe(switchMap((params:Params) => this.dishService.getDish(params['id'])))
      .subscribe(dishes => {this.dish=dishes; this.setPrevNext(dishes.id);});
  }

  onValueChanged(data?:any){
    if (!this.commentForm) { return; }
    const form=this.commentForm;
    for(const field in this.formErrors){
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field]='';
        const control=form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for(const key in control.errors){
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }

  }

  createForm(){
    this.commentForm=this.fb.group({
      author:['',[Validators.required,Validators.minLength(2)]],
      rating:1,
      comment:['',[Validators.required,Validators.minLength(2)]]
    });

    this.commentForm.valueChanges
    .subscribe(data=>this.onValueChanged(data));
    this.onValueChanged();
  }

  onSubmit(){
    let day= new Date();
    this.dish.comments.push({rating:this.commentForm.value.rating,comment:this.commentForm.value.comment,author:this.commentForm.value.author,date:day.toISOString()});
    //console.log(this.dish.comments);
    this.commentForm.reset({
      author:'',
      comment:'',
      rating:5
    });

    this.commentFormDirective.resetForm(this.commentForm.errors);
    
  }

  setPrevNext(dishId:string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

}
