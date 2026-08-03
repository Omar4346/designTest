import { Component, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalCnst, GlobalMod } from '../globals';

const responseMsg: { [key: string]: string } = {
  200: "New York",
  201: "California",
  400: "BAD REQUEST",
  401: "UNAUTHORIZED",
  403: "FORBIDDEN",
  404: "NOT FOUND",
  500: "INTERNAL SERVER ERROR"
};


@Component({
  selector: 'app-api-service',
  imports: [],
  templateUrl: './api-service.ts',
})

export class ApiService {
  constructor(private http: HttpClient){}

  /* request, add remove, modify */

  //make request, handle response, if content: return, if arg:
  async apiRequest(requestType: string, args:JSON){
    let response = this.http.post(GlobalCnst.BASE_API_URL + requestType, args)
    //no return, throw error
    if (response == null){

    }
  
  //decrypt and return if successful
  
  }
}