import {computed, Injectable, signal} from '@angular/core';
import {Cat} from '../interfaces/cats';

@Injectable({
  providedIn: 'root'
})
export class CatsService {
  private catList = signal<Cat[]>([]);

  async fetchCats() {
    console.log('Fetching cats');
    try {
      const response = await fetch(`http://localhost/backend/cats`, {
        method: 'GET',
      });
      const data = await response.json();
      if (response.ok) {
        this.catList.set(data);
        console.log('Cats fetched:', data);
        console.log('Cats signal:', this.catList());
      } else {
        throw new Error(data);
      }
    } catch (error) {
      throw error;
    }
  }

  getCats = computed(() => this.catList);

  get getAllCats() {
    return this.catList;
  }

  postCat(cat: Cat) {
    try {
      fetch(`http://localhost/backend/cats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cat)
      });
    } catch (error) {
      throw error;
    }
  }
}
