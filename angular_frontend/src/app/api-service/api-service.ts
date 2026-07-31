import { Component, } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    let response = this.http.post()
  }
}