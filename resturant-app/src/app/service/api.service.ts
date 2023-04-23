import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }
   //now here i will define the post, get, put,delete
   //create resturant using post method
   postRestaurant(data:any){
  return this._http.post<any>("http://localhost:3000/UserDetails",data)
  .pipe(map((res:any)=>{
    return res;
  }))
   }
   //get resturant data using get method
   getRestaurant(){
    return this._http.get<any>("http://localhost:3000/UserDetails")
    .pipe(map((res:any)=>{
      return res;
    }))
   }
   //update restaurant  using put method
   updateRestaurant(data:any,id:number){
    return this._http.put<any>("http://localhost:3000/UserDetails/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
   }
   //delete restaurant data using delete methods
   deleteRestaurant(id:number){
    return this._http.delete<any>("http://localhost:3000/UserDetails/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
   }
}
