import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {

  pizzaList = []
  toppingList = []

  constructor(private _eventService: EventService,
              private _router: Router) { }


  ngOnInit() {
    
        
  }

}

// this._eventService.getSpecialEvents()
//       .subscribe(
//         res => this.pizzaList = res,
//         err => {
//           if( err instanceof HttpErrorResponse ) {
//             if (err.status === 401) {
//               this._router.navigate(['/login'])
//             }
//           }
//         }
//       )

//       this._eventService.getToppingList()
//         .subscribe(
//           res => this.toppingList = res,
//         err => {
//           console.log(err)
//         }
//       )
