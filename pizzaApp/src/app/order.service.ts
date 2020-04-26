import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderModel } from '../app/models/orderModel';
import { map } from 'rxjs/operators';



export class OrdersService {

  private apiUrl = `http://localhost:3000/order`;

  constructor(
    private http: HttpClient
  ) { }

  getAllOrders(): Observable<any> {
    return this.http.get<OrderModel[]>(`${this.apiUrl}/allorders`);
  }  

  //change order status
  orderStsUpdate(status,id):Observable<any>{

    console.log(status);
  
      let StsUrl = 'http://localhost:3000/order/updateStatus/'+id;

        return this.http.patch(StsUrl,{ 
          "status":status
        })
            .pipe( 
              map(r=>{ 
                if(r){ 
                  return r;
                }else{ 
                  return false;
                }
              })
            );
  }
}
