import { Component, OnInit } from '@angular/core';
import { GlobalCnst, GlobalMod } from '../../globals';

/*
  homepage at minimum should represent the following:

    info field popup for createCustomer
    button for creating customersthat uses entered data
*/
interface Employee {
  id: number;
  name: string;
  department: string;
}

@Component({
  selector: 'app-homepage',
  imports: [],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage{
  username = GlobalMod.username;
  employees: Employee[] = [];
  state: 'loading' | 'success' | 'empty' | 'error' = 'loading';

  addCustomer() {
    console.log('Button clicked');
  }
}
