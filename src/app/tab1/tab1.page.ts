import { Component,OnInit } from '@angular/core';
import{MealService} from '../services/meal.service'
import {Meal} from '../interfaces/interfaces'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  arregloMeals:Meal[]=[];
  constructor(private mealService:MealService) {}
  ngOnInit(){
    this.mealService.getMeals().subscribe(data => {
      console.log(data.meals);
      this.arregloMeals=data.meals;
    });
    this.mealService.getMealDetail(52772).subscribe(data => {
      console.log(data.meals);
    });
  }

}
