import { Component } from '@angular/core';
import { MealService } from '../services/meal.service';
import {AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Meal, Response } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  arregloMealsFavoritas: Meal[] = [];

  constructor(private mealService: MealService,private alertController: AlertController,
    private loadingController: LoadingController,private router: Router) {}


 async ionViewWillEnter(){
  const loading = await this.loadingController.create({
    message:"Cargando comidas..."
  });

  loading.present();
    this.mealService.obtenerfavoritas().then((data)=>{
      console.log(data);
      this.arregloMealsFavoritas = data;
      loading.dismiss();
    })
  }

  async verInfoMeal(id:any) {
    this.mealService.getMealDetail(id).subscribe(async (data: Response) =>{
      console.log(data.meals);
      const alert = await this.alertController.create({
        header: data.meals[0].strMeal,
        subHeader: data.meals[0].strArea,
        buttons: [
          {
            text:'Detalles 🔍',
            handler: () => {
              this.router.navigate(['../meal-detail/', id]);
            },
          },
        ],
      });
  
      await alert.present();
    })
  }
  

}
