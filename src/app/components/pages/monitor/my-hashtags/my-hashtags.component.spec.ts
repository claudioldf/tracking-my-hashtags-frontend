import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHashtagsComponent } from './my-hashtags.component';

describe('MyHashtagsComponent', () => {
  let component: MyHashtagsComponent;
  let fixture: ComponentFixture<MyHashtagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyHashtagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyHashtagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
