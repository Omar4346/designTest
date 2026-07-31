import { Component,} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { createMlKem768, MlKemInterface,} from "mlkem";
import { FormsModule } from '@angular/forms';
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
} from "crypto";
import { GlobalCnst, GlobalMod } from '../../globals';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

@Injectable({
  providedIn: 'root'
})
export class Login {
  constructor(private http: HttpClient, private router: Router) {}
  user = {
    firstName: '',
    lastName: '',
    password: ''
  };

  theirPublicKey = new Uint8Array();
  clientPrivateKey = new Uint8Array();
  clientPublicKey = new Uint8Array();
  errorMessage = '';
  errorType = '';

  async requestAccess() {
    let recipient = await createMlKem768();
    //if no client keys, create them
    if(this.clientPrivateKey.length === 0){
      this.setClientKeys();
    }

    /*
        request public key: 
    */
    //if no server public key, request it
    if (this.theirPublicKey.length === 0){
      //if server can't provide public key, return error
      if((this.theirPublicKey = this.requestKey()).length === 0){
      }
    }
    //encryption process:

      //Generate recipient key-pair(handled)

      //encapsulate shared object
    let [kemCiphertext, sharedSecret] = recipient.encap(this.clientPublicKey)

    //setup object to encrypt/decrypt
    let loginRequest = Buffer.from(JSON.stringify(this.user), "utf8");

    //AES GCM stuff
    let iv = randomBytes(12),
    cipher = createCipheriv(
      "aes-256-gcm",
      Buffer.from(sharedSecret),
      iv
    );
    let encrypted = Buffer.concat([
      cipher.update(loginRequest),
      cipher.final(),
    ]);
    let tag = cipher.getAuthTag();
    let message = {
      kemCiphertext,
      iv,
      tag,
      encrypted,
    };

    let response = this.http.post(GlobalCnst.BASE_API_URL + '/login', message)

    //interpret message returned
    if (response == null){
      //print return err message
    }
    //recreate shared message:
    let decryptedSecret = recipient.decap(
      message.kemCiphertext,
      this.clientPrivateKey
    )
    let decipher = createDecipheriv(
      "aes-256-gcm",
      Buffer.from(decryptedSecret),
      message.iv
    );
    decipher.setAuthTag(message.tag);
    let decrypted = Buffer.concat([
    decipher.update(message.encrypted),
    decipher.final(),
    ]);

    let decryptedResponse = JSON.parse(decrypted.toString("utf8"));

    switch(decryptedResponse[0]){
      case '500':
        //server error
        this.errorMessage = "SERVER_ERROR";
        break;
      case '400':
        //attempt was bad
        this.errorMessage = "BAD_ATTEMPT";
        break;
      case '200':
        //store session cookie
        GlobalMod.sessionKey = decryptedResponse[1];
        GlobalMod.username = decryptedResponse[2];
        //reroute to main page
        this.router.navigate(['/']);
        break;
    }
  }

  requestKey(){
    return new Uint8Array();
  }

  async setClientKeys(){
    //this.clientPublicKey
    //this.clientPrivateKey
    const recipient = await createMlKem768();
    let [clientPublicKey, clientPrivateKey] = recipient.generateKeyPair();
    this.clientPublicKey.set(clientPublicKey);
    this.clientPrivateKey.set(clientPrivateKey);
  }
}