import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterComponent } from './character.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CharacterComponent', () => {
  let component: CharacterComponent;
  let fixture: ComponentFixture<CharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterComponent, RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
