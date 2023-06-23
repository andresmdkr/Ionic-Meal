import { Component } from '@angular/core';
import { MealService } from '../services/meal.service';
import { Meal, Response } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  searchResults: Meal[] = [];
  showNoResultsMessage: boolean = false;

  constructor(private mealService: MealService) {
    this.searchResults = [];
  }
  search(event: any) {
    const searchQuery = event.detail.value;
    if (searchQuery && searchQuery.trim() !== '') {
      this.mealService.getMealByName(searchQuery).subscribe((data: Response) => {
        console.log(data.meals);
        this.searchResults = data.meals;
        this.showNoResultsMessage = this.searchResults.length === 0; // Mostrar el mensaje si no se obtienen resultados
      });
    } else {
      this.searchResults = []; // Reiniciar los resultados de búsqueda si la consulta está vacía
      this.showNoResultsMessage = false; // Ocultar el mensaje cuando se realiza una búsqueda vacía
    }
  }

  resetSearch() {
    this.searchResults = [];
    this.showNoResultsMessage = false;
  }
}

