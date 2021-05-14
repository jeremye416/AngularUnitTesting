import { Component, OnInit } from '@angular/core';
import { JokeService } from '../services/joke/joke.service';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss']
})
export class JokeComponent implements OnInit {
  joke: string = '';
  
  constructor(private service: JokeService) { 
    this.joke = "I haven't loaded a joke yet...";
  }

  ngOnInit(): void {
    this.getJoke();
  }

  getJoke() {
    this.service.getJoke().subscribe(x =>  {
      this.joke = x.value;
    });
  }

}
