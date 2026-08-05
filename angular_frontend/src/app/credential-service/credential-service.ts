import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService} from '../api-service/api-service';

interface user {
    firstName: string,
    lastName: string,
    password: string
};

export interface LoginState {
  currentUser: user | null;
  account: {
      // string index on accout will return a string
      [k: string]: string;

      username: string;
      password: string;
      address: string;
      anotherField: string;
  };
}

@Component({
  selector: 'app-credential-service',
  imports: [],
  templateUrl: './credential-service.ts'
})


export class CredentialService {
  private Api:ApiService = new ApiService(HttpClient);
  async request_public_key(){
    let response = this.Api.apiRequest("GET", "");
  }

  async encrypt(){
  }

  //decrypt():
  async decrypt(){
  }

  //update_keys():
  async update_keys(){
  }
}