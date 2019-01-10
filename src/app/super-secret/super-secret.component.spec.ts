import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperSecretComponent } from './super-secret.component';

describe('SuperSecretComponent', () => {
  let component: SuperSecretComponent;
  let fixture: ComponentFixture<SuperSecretComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperSecretComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperSecretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
