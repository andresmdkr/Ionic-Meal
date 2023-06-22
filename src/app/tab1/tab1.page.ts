import { Component,OnInit } from '@angular/core';
import{MealService} from '../services/meal.service'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private mealService:MealService) {}
  ngOnInit(){
    this.mealService.getMeals().subscribe(data => {
      console.log(data);
    });
  }

}
