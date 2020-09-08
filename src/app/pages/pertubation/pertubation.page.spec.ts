import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PertubationPage } from './pertubation.page';

describe('PertubationPage', () => {
  let component: PertubationPage;
  let fixture: ComponentFixture<PertubationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PertubationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PertubationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
