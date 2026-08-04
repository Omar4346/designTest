import { Component, } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const responseMsg: { [key: string]: string } = {
  200: "OK",
  201: "CREATED",
  202: "ACCEPTED",
  400: "BAD REQUEST",
  401: "UNAUTHORIZED",
  403: "FORBIDDEN",
  404: "NOT FOUND",
  500: "INTERNAL SERVER ERROR"
};

const GlobalCnst = Object.freeze({
     BASE_API_URL: 'http://example.com/',
});


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
    //call encryption function to encrypt args
    let encryptedArgs 

    let response = this.http.post(GlobalCnst.BASE_API_URL + requestType, args)
    //no return, throw error
    if (response == null){
      return 0;
    }
    //decrypt message, respond to error code

  
  //decrypt and return if successful
  
  }
}