import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  output = "Hello World";
  num = 1254564.1456;
  int = 54564;
  date = new Date(2016, 5, 16);
  dateNum = this.date.valueOf();
  dateStr = "2004-10-08";
  obj = {
    firstName: 'Jeremy',
    lastName: 'Edmondson',
    children: 2,
    birthDay: new Date(1979, 3, 16)
  }

  constructor() { }

  ngOnInit(): void {
  }

  getType(obj: any) {
    return typeof obj;
  }

  onKeyUp(args: any) {
    console.log(args);
  }

}
