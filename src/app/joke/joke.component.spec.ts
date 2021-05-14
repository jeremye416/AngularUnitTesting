import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';

import { JokeComponent } from './joke.component';
import { JokeModel } from '../models/joke-model';
import { Observable } from 'rxjs';
import { JokeService } from '../services/joke/joke.service';

describe('JokeComponent', () => {
  let component: JokeComponent;
  let fixture: ComponentFixture<JokeComponent>;
  let httpTestingController: HttpTestingController;
  let service: JokeService;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JokeComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(JokeService);
    fixture = TestBed.createComponent(JokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get a joke', () => {
    const joke: JokeModel = {
      value: "joke value",
      icon_url: "icon url",
      id: "joke id",
      url: "joke url"
    };
    const initialValue = "I haven't loaded a joke yet...";
    const req = httpTestingController.expectOne('https://api.chucknorris.io/jokes/random');
    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');
    
    component.ngOnInit();
    
    expect(component.joke).toBe(initialValue);
    
    req.flush(joke);
    
    expect(component.joke).toBe(joke.value);
  });

  it('should interacts with the joke service', () => {
    const joke: JokeModel = {
      value: "joke value",
      icon_url: "icon url",
      id: "joke id",
      url: "joke url"
    };

    spyOn(service, 'getJoke').and.returnValue(new Observable<JokeModel>((x) => {
      return x.next(joke);
    }));
    
    component.ngOnInit();
    expect(service.getJoke).toHaveBeenCalled();
    expect(component.joke).toBe(joke.value);
  });

  it('should call get joke', () => {
    spyOn(component, 'getJoke');
    component.ngOnInit();
    expect(component.getJoke).toHaveBeenCalled();
  });
});
