import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response,Meal } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private _storage: Storage | null = null;
  apiUrl = 'https://themealdb.com/api/json/v1/1/';

  mealsfavoritas: Meal[] = []

  constructor(private http:HttpClient, private storage: Storage) { 
    this.init()
}
async init() {
  // If using, define drivers here: await this.storage.defineDriver(/*...*/);
  const storage = await this.storage.create();
  this._storage = storage;
}

getMeals() {
  const url = this.apiUrl + 'search.php?f=b';
  return this.http.get<Response>(url);
}

getMealDetail(id: any){
  const url = this.apiUrl + 'lookup.php?i='+id;
  return this.http.get<Response>(url)
}

getMealByName(name: string){
  const url = this.apiUrl + 'search.php?s='+name;
  return this.http.get<Response>(url)
}

getMealByCategory(category: string){
  const url = this.apiUrl + 'filter.php?c='+category;
  return this.http.get<Response>(url)

}

getAllCategories(){
  const url = this.apiUrl + 'list.php?c=list';
  return this.http.get<Response>(url)
}

  async agregarMealFavoritas(meal:Meal){
 /*  this.mealsfavoritas =  await this._storage?.get("mealfavoritas");  */
  this.mealsfavoritas.push(meal);
  this._storage?.set("mealsfavoritas", this.mealsfavoritas);
}

  async obtenerfavoritas(){
  const comidasFavoritas = await this._storage?.get("mealsfavoritas");
  return comidasFavoritas
}

}