import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meal, Response } from '../interfaces/interfaces';
import { MealService } from '../services/meal.service';
import {LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.page.html',
  styleUrls: ['./meal-detail.page.scss'],
})
export class MealDetailPage implements OnInit {
  Meal: Meal[] = [];

  constructor(private mealService: MealService,private route: ActivatedRoute,private loadingController: LoadingController,private router: Router) { }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message:"Cargando comida..."
    });

    loading.present();
    this.route.paramMap.subscribe(params => {
      const mealId = params.get('id');

      this.mealService.getMealDetail(mealId).subscribe((data: Response) => {
        console.log(data.meals);
        this.Meal = data.meals;
        loading.dismiss();
      });
      
    });
    
  }
  goToHome(){
    this.router.navigate(['/tabs/meals']);
  }


}
