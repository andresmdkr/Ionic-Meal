import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response,Meal } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  apiUrl = 'https://themealdb.com/api/json/v1/1/';
  constructor(private http:HttpClient) { 

}

getMeals() {
  const url = this.apiUrl + 'search.php?f=b';
  return this.http.get<Response>(url);
}

getMealDetail(id: number){
  const url = this.apiUrl + 'lookup.php?i='+id;
  return this.http.get<Response>(url)
}

}

