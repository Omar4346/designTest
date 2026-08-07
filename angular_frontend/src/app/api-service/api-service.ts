import { Component, } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  async apiRequest(url: string, requestType: string, args:JSON){
    switch (requestType){
      case "POST":
        return this.http.post(GlobalCnst.BASE_API_URL + url, args);
      case "GET":
        return this.http.get(GlobalCnst.BASE_API_URL + url);
      case "PUT":
        return this.http.put(GlobalCnst.BASE_API_URL + url, args);
      case "DELETE":
        return this.http.delete(GlobalCnst.BASE_API_URL + url)
      case "PATCH":
        return this.http.patch(GlobalCnst.BASE_API_URL + url, args)
      default:
        return null;
    }
  }
}