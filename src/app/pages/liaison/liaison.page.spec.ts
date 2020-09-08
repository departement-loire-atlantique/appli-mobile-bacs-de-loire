import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LiaisonPage } from './liaison.page';

describe('LiaisonPage', () => {
  let component: LiaisonPage;
  let fixture: ComponentFixture<LiaisonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiaisonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LiaisonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
