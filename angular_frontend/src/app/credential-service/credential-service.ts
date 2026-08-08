import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService} from '../api-service/api-service';
import { createMlKem768, MlKemInterface} from "mlkem";

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
  private recipient: Awaited<ReturnType<typeof createMlKem768>>;

  private constructor(recipient: Awaited<ReturnType<typeof createMlKem768>>) {
    this.recipient = recipient;
  }

  static async create(): Promise<CredentialService> {
    const recipient = await createMlKem768();
    return new CredentialService(recipient);
  }

  async request_public_key(){
    let keyResponse:{[index: string]:any} = this.Api.apiRequest("GET", "publicKey");
    if(keyResponse["key"] == null)
      return null;
    return (keyResponse["key"])
  }

  async encrypt(input:JSON){
    //encrypt input, return
    const recipient = await CredentialService.create();

    let [kemCiphertext, sharedSecret] = recipient.encap(this.clientPublicKey)
    let toEncrypt = Buffer.from(JSON.stringify(input), "utf8");


    let iv = randomBytes(12),
    cipher = createCipheriv(
      "aes-256-gcm",
      Buffer.from(sharedSecret),
      iv
    );
    let encrypted = Buffer.concat([
      cipher.update(toEncrypt),
      cipher.final(),
    ]);
    let tag = cipher.getAuthTag();
    let message = {
      kemCiphertext,
      iv,
      tag,
      encrypted,
    };
    return message


  }

  //decrypt():
  async decrypt(){
  }

  async initClientKeys(){
    const credentialService = await CredentialService.create();
    [this.clientPublicKey, this.clientPrivateKey] = this.recipient.generateKeyPair();
  }
}