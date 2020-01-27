import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HashtagFilterComponent } from './hashtag-filter.component';

describe('HashtagFilterComponent', () => {
  let component: HashtagFilterComponent;
  let fixture: ComponentFixture<HashtagFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HashtagFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HashtagFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
