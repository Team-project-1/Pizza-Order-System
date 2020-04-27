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

  pizzaList = [];
  toppingList = [];


  constructor(private _eventService: EventService,
              private _router: Router) { }


  ngOnInit() {
    let item = localStorage.getItem('pizza')
    this.pizzaList.push(JSON.parse(item))  
    console.log(this.pizzaList)     


    this._eventService.getToppingList()
    .subscribe(
      res => this.toppingList = res,
    err => {
      console.log(err)
    }
  )
  }

  onChange($event){
    let text = $event.target.options[$event.target.options.selectedIndex].text;
    console.log(text)
    console.log(this.toppingList)
    console.log(this.pizzaList)
    }

  
}


