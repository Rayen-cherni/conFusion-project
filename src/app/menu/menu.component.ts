import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../menu/shared/dish';
import { DISHES } from '../menu/shared/dishes';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  //selectedDish: Dish;
  
  
  //On passer les donnes avec les notions des services
  dishes: Dish[];

  //Message d'erreur
  errMess: string;
  
  //On a passer les donnes sans utiliser la notion des services 
  // dishes: Dish[] = DISHES;


  // When Angular creates a new instance of a component class,
  // it determines which services or other dependencies that component needs by looking at the constructor parameter types
  constructor( private dishService : DishService,
    @Inject('baseURL') public baseURL
   ) { }

  ngOnInit(): void {
     this.dishService.getDishes()

     //Si on veut utiliser le promises on utilise .then mais dans le cas ou on veut utiliser observable on utilise .subscribe
     //.then( (dishes) => this.dishes = dishes);
     .subscribe( (dishes) => this.dishes = dishes,errmess => this.errMess = <any>errmess);
  }



  //After using the Http server to provide the data we delelte this function
  //onSelect(dish: Dish){
    //this.selectedDish = dish;
  //}

}
