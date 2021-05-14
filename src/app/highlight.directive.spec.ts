import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

@Component({
  template: `
  <h2 appHighlight>Something Yellow</h2>
  <h3 appHighlight color="green">Green Highlight</h3>`
})
class TestComponent { }

describe('HighlightDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ HighlightDirective, TestComponent ]
    })
    .createComponent(TestComponent);
    fixture.detectChanges(); // initial binding
    component = fixture.componentInstance;
  });
  
  it('should create an instance', () => {
    var components = fixture.debugElement.queryAll(By.directive(HighlightDirective));
    expect(components.length).toBe(2);
  });

  it('should default to yellow', () => {
    var h2 = fixture.debugElement.query(By.css('H2'));
    expect(h2.styles.backgroundColor).toBe('yellow');
  });

  it('should be set to green', () => {
    var h3 = fixture.debugElement.query(By.css('H3'));
    expect(h3.styles.backgroundColor).toBe('green');
  });
});
