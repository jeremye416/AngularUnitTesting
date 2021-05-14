import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';
import { CreateUserComponent } from './create-user.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { CreateUserResponse } from '../models/create-user';
import { ApiService } from '../services/api/api.service';
import { RegisterResponse } from '../models/register';
import { environment } from 'src/environments/environment';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUserComponent ],
      imports: [HttpClientTestingModule, MatSnackBarModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(CreateUserComponent);
    service = TestBed.inject(ApiService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have email form control', () => {
    expect(component.email).toBeInstanceOf(FormControl);
  });

  it('email to have default value', () => {
    expect(component.email.value).toBe('jeremy@gmail.com');
  });

  it('generates required email error message', () => {
      component.email.setValue('');
      let msg = component.getEmailErrorMessage();
      expect(msg).toBe('You must enter a value');
  });

  it('generates valid email error message', () => {
    component.email.setValue('asdf');
    let msg = component.getEmailErrorMessage();
    expect(msg).toBe('Not a valid email');
  });

  it('creates a user', () => {
    // Arrange
    component.name.setValue('Jeremy');
    component.job.setValue('Janitor');
    
    spyOn(service, 'createUser').and.returnValue(new Observable<CreateUserResponse>((x) => {
      return x.next({
        name: 'Jeremy',
        job: 'Janitor'
      });
    }));

    // Act
    component.create();

    // Assert
    expect(service.createUser).toHaveBeenCalledWith({
      name: 'Jeremy',
      job: 'Janitor'
    });
    expect(component.response.name).toBe('Jeremy');
    expect(component.response.job).toBe('Janitor');
  });

  it('generates min length password error message', () => {
    component.password.setValue('ASDF');
    let msg = component.getPasswordErrorMessage();
    expect(msg).toBe('Password should be 8 characters');
  });

  it('resets form on cancel', () =>  {
    spyOn(component.createFormGroup, 'reset');
    component.cancel();
    expect(component.createFormGroup.reset).toHaveBeenCalled();
  });

  it('resets response on cancel', () =>  {
    const defaultValue = { message: 'a sample response'};
    component.response = defaultValue;
    expect(component.response).toBe(defaultValue);
    component.cancel();
    expect(component.response).toEqual({});
  });

  it('creates a user', () => {
    spyOn(service, 'createUser').and.returnValue(new Observable<CreateUserResponse>((x) => {
      return x.next({
        name: 'test user',
        job: 'test job',
        id: 'ASDF ASDF',
        createdAt: new Date().toDateString()
      });
    }));

    spyOn(service, 'register').and.returnValue(new Observable<RegisterResponse>((x) => {
      return x.next({
        token: 'QWERTY',
        id: 'ASDF ZXCV'
      });
    }));

    component.create();
    expect(service.createUser).toHaveBeenCalled();
    expect(service.register).toHaveBeenCalled();
    expect(component.response.registerId).toBe('ASDF ZXCV');
    expect(component.response.token).toBe('QWERTY');
  });

  it('handles an error', () => {
    spyOn(service, 'createUser').and.returnValue(new Observable<CreateUserResponse>((x) => {
      return x.next({
        name: 'test user',
        job: 'test job',
        id: 'ASDF ASDF',
        createdAt: new Date().toDateString()
      });
    }));

    spyOn(service, 'register').and.returnValue(new Observable<RegisterResponse>((x) => {
      return x.error();
    }));

    
    const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
    const data = 'Invalid request parameters';
    
    component.create();

    var request = httpTestingController.expectOne(`${environment.reqres}/api/register`);
    request.flush(data, mockErrorResponse);
    
    expect(service.register).toHaveBeenCalled();

    httpTestingController.verify();
  });

});
