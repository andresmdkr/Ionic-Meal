import { Component } from '@angular/core';
import { MealService } from '../services/meal.service';
import { Meal, Response } from '../interfaces/interfaces';
import {AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  searchResults: Meal[] = [];
  showNoResultsMessage: boolean = false;

  constructor(private mealService: MealService,private loadingController: LoadingController,private router: Router,private alertController: AlertController,) {
    this.searchResults = [];
  }

  async search(event: any) {
    const searchQuery = event.detail.value;

    //Loading
    const loading = await this.loadingController.create({
      message:"Buscando..."
    });
    

    if (searchQuery && searchQuery.trim() !== '') {
      loading.present();
      this.mealService.getMealByName(searchQuery).subscribe((data: Response) => {
        console.log(data.meals);
        if (data.meals === null) {
          this.searchResults = [];
          this.showNoResultsMessage = true; // Mostrar el mensaje si no se obtienen resultados
          loading.dismiss();
        } else {
          this.searchResults = data.meals;
          this.showNoResultsMessage = false;
          loading.dismiss();
        }
      });
    } else {
      this.searchResults = [];
      this.showNoResultsMessage = false;
    }
  }

  resetSearch() {
    this.searchResults = [];
    this.showNoResultsMessage = false;
  }


  async verInfoMeal(id:any) {
    this.mealService.getMealDetail(id).subscribe(async (data: Response) =>{
      console.log(data.meals);
      const alert = await this.alertController.create({
        header: data.meals[0].strMeal,
        subHeader: data.meals[0].strArea,
        message: data.meals[0].strInstructions,
        buttons: [
          {
            text: 'Detalles',
            handler: () => {
              this.router.navigate(['../meal-detail/', id]);
            },
          },
          {
            text: 'Agregar a Favoritas',
            handler: () => {
              console.log('Holis');
            },
          },
        ],
      });
  
      await alert.present();
    })
  }
}
