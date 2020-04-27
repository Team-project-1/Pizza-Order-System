import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
  pizzaList = [];
  items = [];

  constructor(private _eventService: EventService,
              private _router: Router) { }


  ngOnInit() {
    this._eventService.getSpecialEvents()
      .subscribe(
        res => this.pizzaList = res,
        err => {
          if( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )
        
  }

  store(_id) {
    // let pizzaItem = this.pizzaList.find(item => item.id === _id)
    this.items = _id   
    localStorage.setItem("pizza", JSON.stringify(this.items));
  }


}


