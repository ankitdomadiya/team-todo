import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GKeepComponent } from './g-keep.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';

describe('GKeepComponent', () => {
  let component: GKeepComponent;
  let fixture: ComponentFixture<GKeepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GKeepComponent ],

      imports:[
        HttpClientModule,
        FormsModule,
        ToastrModule.forRoot(),
        RouterTestingModule
      ],
      
      providers:[
        HttpClient,
        ToastrService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GKeepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
