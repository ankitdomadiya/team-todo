import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TasksService } from './tasks.service';
import { of } from 'rxjs';

describe('TasksService', () => {
  let service: TasksService;
  let mockHttpClient;

  beforeEach(() => {
    service = new TasksService(mockHttpClient);
    TestBed.configureTestingModule({
      imports : [
        HttpClientModule
      ],
      providers: [
        HttpClient
      ]
    });

    service = TestBed.inject(TasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shoud be return task title', ()=> {
    let mockResponse = [
      {
        ListItems: [
          {
            checkbox: false,
            items: ""
          },
          {
            checkbox: false,
            items: ""
          }
        ],
        title: "",
        id: 1
      }
    ];

    // let response;

    // spyOn(service, 'getTasks').and.returnValue(of(mockResponse));
    // service.getTasks().subscribe(res => {response = res});
    // expect(response).toEqual(mockResponse);
    
  })
});
