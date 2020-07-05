import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../menu/shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../menu/shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../menu/shared/leader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;

  //Error
  dishErrMess : string ;
  
  constructor(private dishservice: DishService,
    private promotionservice: PromotionService, 
    private leaderService: LeaderService,
    @Inject('baseURL') public baseURL
    
    ) { }

  ngOnInit(): void { 
     this.dishservice.getFeaturedDish()

         //Si on veut utiliser le promises on utilise .then mais dans le cas ou on veut utiliser observable on utilise .subscribe

     //.then( dish => { return this.dish = dish } );
     .subscribe( dish => { return this.dish = dish }, 
      errmess => this.dishErrMess = <any>errmess );

     this.promotionservice.getFeaturedPromotion()
     //.then( promotion => { return this.promotion = promotion });
     .subscribe( dish => { return this.promotion = dish } );

     this.leaderService.getFeaturedLeader()
     //.then( leader => { return this.leader = leader } );
     .subscribe( leader => { return this.leader = leader } );
  }

}
