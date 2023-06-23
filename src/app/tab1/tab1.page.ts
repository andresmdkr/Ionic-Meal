import { Component, OnInit } from '@angular/core';
import { MealService } from '../services/meal.service';
import { Meal, Response } from '../interfaces/interfaces';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  arregloMeals: Meal[] = [];
  arregloCategories: Meal[] = [];
  filteredMeals: Meal[] = [];

  constructor(private mealService: MealService,
    private loadingController: LoadingController) {}

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message:"Cargando comidas..."
    });

    loading.present();
    this.mealService.getMeals().subscribe((data: Response) => {
      console.log(data.meals);
      this.arregloMeals = data.meals;
      this.filteredMeals = data.meals; // Inicialmente muestra todas las comidas
      loading.dismiss();
    });

    this.mealService.getAllCategories().subscribe((data: Response) => {
      console.log(data.meals);
      this.arregloCategories = data.meals;
    });
  }

  async onSelectCategory(event: any) {
    const loading = await this.loadingController.create({
      message:"Cargando seleccion..."
    });
    const selectedCategory = event.detail.value;
    
    if (selectedCategory === 'All') {
      this.filteredMeals = this.arregloMeals; // Mostrar todas las comidas si se selecciona 'All'
    } else {
      loading.present();
      this.mealService.getMealByCategory(selectedCategory).subscribe((data: Response) => {
        console.log(data.meals);
        this.filteredMeals = data.meals;
        loading.dismiss();
      });
      
    }
  }
}



