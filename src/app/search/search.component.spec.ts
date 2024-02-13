import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SearchComponent } from "./search.component"
import { MarvelApiService } from "../marvel-api.service";
import { of } from "rxjs";

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  const mockMarvelApiService = {
    searchCharacters: () => of({
      "id": 1009718,
      "name": "Wolverine",
      "thumbnail": {
        "path": "http://i.annihil.us/u/prod/marvel/i/mg/2/60/537bcaef0f6cf",
        "extension": "jpg"
      },
      "resourceURI": "http://gateway.marvel.com/v1/public/characters/1009718",
      "comics": {
        "available": 2678
      },
      "series": {
        "available": 742
      },
      "stories": {
        "available": 3692
      },
      "events": {
        "available": 42
      }
    })
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchComponent],
      providers: [{ provide: MarvelApiService, useValue: mockMarvelApiService }]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('create component', () => {
    expect(component).toBeTruthy();
  })
})