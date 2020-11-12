import { Injectable } from '@angular/core';
import { Dish } from "../shared/dish";
//import { DISHES } from "../shared/dishes";
import { Observable,of } from "rxjs";
import { delay } from "rxjs/operators";
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { baseURL } from "../shared/baseurl";
import { map,catchError } from "rxjs/operators";
import { ProcessHTTPMsgService } from "../services/process-httpmsg.service";
@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http:HttpClient,
    private proccessHTTPMsgService: ProcessHTTPMsgService) { }

/*   getDishes(): Promise<Dish[]>{
    return of(DISHES).pipe(delay(2000)).toPromise();  

     return new Promise(resolve=>{
        //simulate server latency with 2 second delay
      setTimeout(() => resolve(DISHES),2000);  
    }); 
  } */

  getDishes(): Observable<Dish[]>{
    //return of(DISHES).pipe(delay(2000));  

    return this.http.get<Dish[]>(baseURL + 'dishes')
      .pipe(catchError(this.proccessHTTPMsgService.handleError));

    /* return new Promise(resolve=>{
        //simulate server latency with 2 second delay
      setTimeout(() => resolve(DISHES),2000);  
    }); */
  }

/*   getDish(id:string): Promise<Dish>{
    return of(DISHES.filter((dish)=>(dish.id === id))[0]).pipe(delay(2000)).toPromise();

     return new Promise(resolve=>{
      //simulate server latency with 2 second delay
    setTimeout(() => resolve(DISHES.filter((dish)=>(dish.id === id))[0]),2000);  
    }); 
    
  } */

  getDish(id:string): Observable<Dish>{
    //return of(DISHES.filter((dish)=>(dish.id === id))[0]).pipe(delay(2000));

    return this.http.get<Dish>(baseURL + 'dishes/' +id)
      .pipe(catchError(this.proccessHTTPMsgService.handleError),delay(2000));

/*     return new Promise(resolve=>{
      //simulate server latency with 2 second delay
    setTimeout(() => resolve(DISHES.filter((dish)=>(dish.id === id))[0]),2000);  
    }); */
    
  }

  getFeaturedDish(): Observable<Dish>{
    //return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));  

    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.proccessHTTPMsgService.handleError),delay(2000));
    
/*     return new Promise(resolve=>{
      //simulate server latency with 2 second delay
    setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]),2000);  
    });
 */
  }

  getDishIds():Observable<string | any>{
    //return of(DISHES.map(dish => dish.id));
    return this.getDishes().pipe(map(dishes=>dishes.map(dish=>dish.id)))
      .pipe(catchError(error=>error),delay(2000));
  }

  putDish(dish:Dish):Observable<Dish>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };

    return this.http.put<Dish>(baseURL + 'dishes/' +dish.id, dish, httpOptions)
      .pipe(catchError(this.proccessHTTPMsgService.handleError));
  }
}
