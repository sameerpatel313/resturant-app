import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestaurantData } from '../model/model';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css']
})
export class RestaurentDashComponent implements OnInit {

 formValue!:FormGroup;
 restaurantModelObj:RestaurantData=new RestaurantData;
  allResturantData: any;
   showAdd!:boolean;
   showbtn!:boolean;
 constructor(private _formBuilder:FormBuilder, private _api:ApiService){}
  ngOnInit(): void {
  this.formValue=this._formBuilder.group({
    name:[''],
    email:[''],
    mobile:[''],
    address:[''],
    service:['']
    
  })
  this.getAllData();
  }

  clickAddResto(){
    this.formValue.reset();
    this.showAdd=true;
    this.showbtn=false;
  }
  //now subscribing our data  which is maped via services
  addResto(){
    this.restaurantModelObj.Name=this.formValue.value.name;
    this.restaurantModelObj.Email=this.formValue.value.email;
    this.restaurantModelObj.Mobile=this.formValue.value.mobile;
    this.restaurantModelObj.Address=this.formValue.value.address;
    this.restaurantModelObj.Service=this.formValue.value.service;
    

    this._api.postRestaurant(this.restaurantModelObj).subscribe(res=>{
      console.log(res);
      alert("Restaurant Record Added Successfull");
      //clear fill form data
      let ref=document.getElementById('clear');
      ref?.click();
      this.formValue.reset()
      this.getAllData();
    },
    err=>{
      alert("Any Thing Happen Wrong")
    }
    )
    
  }
  //get all deta
  getAllData(){
    this._api.getRestaurant().subscribe(res=>{
      this.allResturantData=res;
    })
  }
  //delete records
  deleteResto(data:any){
    this._api.deleteRestaurant(data.id).subscribe(res=>{
      alert("Resturant Record Deleted ")
      this.getAllData(); //quick refresh data
      
    })
  }
  //edit record
  onEditResto(data:any){
    this.showAdd=false;
    this.showbtn=true;
    this.restaurantModelObj.id=data.id
    this.formValue.controls['name'].setValue(data.Name);
    this.formValue.controls['email'].setValue(data.Email);
    this.formValue.controls['mobile'].setValue(data.Mobile);
    this.formValue.controls['address'].setValue(data.Address);
    this.formValue.controls['service'].setValue(data.Service);
  }

  updateResto(){ 
    this.restaurantModelObj.Name=this.formValue.value.name;
    this.restaurantModelObj.Email=this.formValue.value.email;
    this.restaurantModelObj.Mobile=this.formValue.value.mobile;
    this.restaurantModelObj.Address=this.formValue.value.address;
    this.restaurantModelObj.Service=this.formValue.value.service;

    this._api.updateRestaurant(this.restaurantModelObj, this.restaurantModelObj.id)
    .subscribe(res=>{
      alert("Resturant Record Update")
      let ref=document.getElementById('clear');
      ref?.click();
      this.formValue.reset()
      this.getAllData();
    })
  }

}
