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

  //should handle request, add, remove, modify
  //make request, handle response, if content: return, if arg:

  /*
    anatomy of api call:
      method
      URL
      HEADER
      QUERY PARAMETERS
      BODY
      RESPONSE (FUNCTION RESPONDS TO REQUEST)

  */
  async apiRequest(requestType: string, args:JSON){
    let response = this.http.(GlobalCnst.BASE_API_URL + requestType, args)
    //no return, throw error
    if (response == null){
      return null;
    if (response[0][0] != 2){
      return response[0];
    }
    return response;
    }  
  }
}