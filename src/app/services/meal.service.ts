import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MealService {
  
  apiUrl = 'https://themealdb.com/api/json/v1/1/';

  constructor(private http:HttpClient) { 

}

getMeals() {
  const url = this.apiUrl + 'search.php?f=b';
  return this.http.get(url);
}
}
