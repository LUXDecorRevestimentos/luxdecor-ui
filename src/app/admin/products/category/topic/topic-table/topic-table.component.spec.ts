import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicTableComponent } from './topic-table.component';

describe('TopicTableComponent', () => {
  let component: TopicTableComponent;
  let fixture: ComponentFixture<TopicTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
