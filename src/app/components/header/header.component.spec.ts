import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { HeaderComponent } from './header.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let document: Document;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }), // Mock des paramètres de route si nécessaire
            snapshot: {
              paramMap: {
                get: () => '123' // Mock des paramètres de route si nécessaire
              }
            }
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    document = TestBed.inject(DOCUMENT);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dark class on html element', () => {
    const htmlElement = document.createElement('html');
    spyOn(document, 'querySelector').and.returnValue(htmlElement);

    component.toggle();

    expect(htmlElement.classList.contains('dark')).toBeTrue();

    component.toggle();

    expect(htmlElement.classList.contains('dark')).toBeFalse();
  });
});

