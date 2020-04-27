import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class EventService {

  private _homePageUrl = "http://localhost:3000/api/allpizzas";
  private _toppingList = "http://localhost:3000/api/alltoppings";
  private _singlepizza = "http://localhost:3000/api/pizza/:id";

  constructor(private http: HttpClient) { }

  getSpecialEvents() {
    return this.http.get<any>(this._homePageUrl)
  }

  getSinglePizza() {
    return this.http.get<any>(this._singlepizza)
  }

  getToppingList() {
    return this.http.get<any>(this._toppingList)
  }
}
