import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AlternateCapsPipe } from '../alternate-caps.pipe';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent, AlternateCapsPipe ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set output to Hello World', () => {
    expect(component.output).toBe("Hello World");
  });

  it('should set num to 1254564.1456', () => {
    expect(component.num).toBe(1254564.1456);
  });

  it('currency output exists', () => {
    let el = fixture.nativeElement.querySelector('#currencyOutput');
    expect(el).not.toBeNull();
  });

  it('currency output formats properly', () => {
    let el = fixture.nativeElement.querySelector('#currencyOutput');
    expect(el.innerText).toBe('$1,254,564.15');
  });

  it('currency output rounds down', () => {
    component.num = 100.154;
    fixture.detectChanges();
    let el = fixture.nativeElement.querySelector('#currencyOutput');
    expect(el.innerText).toBe('$100.15');
  });
  
  it('should format date', () => {
    let el = fixture.nativeElement.querySelector('.date-wrapper');
    expect(el.innerText).toBe('Date (object): 1616, June 16, 2016, 12:00:00 AM');
  });
});
