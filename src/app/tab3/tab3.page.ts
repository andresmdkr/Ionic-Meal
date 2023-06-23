import { Component } from '@angular/core';
import { MealService } from '../services/meal.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private mealService: MealService) {}
  async ngOnInit() { 
    console.log(this.mealService.obtenerfavoritas());
    }
}
