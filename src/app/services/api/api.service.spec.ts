import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { CreateUserRequest, CreateUserResponse } from 'src/app/models/create-user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegisterRequest, RegisterResponse } from 'src/app/models/register';

describe('ApiService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a user', () => {
    const req: CreateUserRequest =  {
      name: 'Test User',
      job: 'Test Job'
    };

    const resp: CreateUserResponse = {
      createdAt: new Date().toDateString(),
      id: 'asdf',
      job: 'Test Job 1',
      name: 'Test User 2'
    }

    service.createUser(req).subscribe(x => {
      expect(x).toBe(resp);
    });

    const req1 = httpTestingController.expectOne(`${environment.reqres}/api/users`);
    expect(req1.request.method).toEqual('POST');
    req1.flush(resp);
    httpTestingController.verify();
  });

  it('should register a user', () => {
    const req: RegisterRequest =  {
      email: 'test email',
      password: 'test password'
    };

    const resp: RegisterResponse = {
      id: 'test id',
      token: 'ASDFASDFASDF'
    }

    service.register(req).subscribe(x => {
      expect(x).toBe(resp);
    });

    const req1 = httpTestingController.expectOne(`${environment.reqres}/api/register`);
    expect(req1.request.method).toEqual('POST');
    req1.flush(resp);
    httpTestingController.verify();
  });
});
