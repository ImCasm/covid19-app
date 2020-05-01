import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColombiaDataTableComponent } from './colombia-data-table.component';

describe('ColombiaDataTableComponent', () => {
  let component: ColombiaDataTableComponent;
  let fixture: ComponentFixture<ColombiaDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColombiaDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColombiaDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
