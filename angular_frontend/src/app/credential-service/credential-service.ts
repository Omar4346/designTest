import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService} from '../api-service/api-service';
import { createMlKem768 } from "mlkem";

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
  private clientPublicKey = new Uint8Array();
  private clientPrivateKey = new Uint8Array();
  private serverPublicKey = new Uint8Array();

  private recipient = new Promise((resolveOuter) => {
  resolveOuter(
    new Promise((resolveInner) => {
      setTimeout(resolveInner, 1000);
    }),
  );
});

  async request_public_key(){
    let keyResponse:{[index: string]:any} = this.Api.apiRequest("GET", "publicKey");
    if(keyResponse["key"] == null)
      return null;
    return (keyResponse["key"])
  }

  async encrypt(input:JSON){
    //encrypt input, return
    let [kemCiphertext, sharedSecret] = recipient.encap(this.clientPublicKey)
  }

  //decrypt():
  async decrypt(){
  }

  async initClientKeys(){
    let recipient = await createMlKem768();
    [this.clientPublicKey, this.clientPrivateKey] = recipient.generateKeyPair();
  }
}