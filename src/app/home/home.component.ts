import { Component, OnInit,Inject } from '@angular/core';
import { Dish } from "../shared/dish";
import { DishService } from "../services/dish.service";
import { Promotion } from "../shared/promotion";
import { PromotionService } from "../services/promotion.service";
import { Leader } from "../shared/leader";
import { LeaderService } from "../services/leader.service";
import { flyInOut,expand } from "../animations/app.animation";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block;'
  },
  animations:[
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {


  dish:Dish;
  promotion:Promotion;
  leader:Leader;
  dishErrMss:string;

  constructor(private dishService:DishService, 
    private promotionService:PromotionService,
    private leaderService:LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit(): void {
    this.dishService.getFeaturedDish()
      .subscribe(dishes => this.dish=dishes,
        errMsg=>this.dishErrMss=<any>errMsg);
    this.promotionService.getFeaturedPromotion()
      .subscribe(promotions => this.promotion=promotions);
    this.leaderService.getFeaturedLeader()
      .subscribe(leaders => this.leader=leaders);
  }


}
