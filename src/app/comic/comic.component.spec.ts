import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicComponent } from './comic.component';
import { MarvelApiService } from '../marvel-api.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ComicComponent', () => {
  let component: ComicComponent;
  let fixture: ComponentFixture<ComicComponent>;
  const mockMarvelApiService = {
    getComic: () => of({
      "id": 38756,
      "title": "5 Ronin (2010) #1",
      "description": "17th century Japan: a time and place of violent upheaval. Into this strange and dangerous world come Wolverine, Pyslocke, Punisher, Hulk and Deadpool. Five of Marvel's greatest heroes as you've never seen them before!",
      "urls": [
        {
          "type": "detail",
          "url": "http://marvel.com/comics/issue/38756/5_ronin_2010_1?utm_campaign=apiRef&utm_source=3b618f34d6259a442737554c36d4421b"
        },
        {
          "type": "purchase",
          "url": "http://comicstore.marvel.com/5-Ronin-1/digital-comic/19853?utm_campaign=apiRef&utm_source=3b618f34d6259a442737554c36d4421b"
        },
        {
          "type": "reader",
          "url": "http://marvel.com/digitalcomics/view.htm?iid=19853&utm_campaign=apiRef&utm_source=3b618f34d6259a442737554c36d4421b"
        },
        {
          "type": "inAppLink",
          "url": "https://applink.marvel.com/issue/19853?utm_campaign=apiRef&utm_source=3b618f34d6259a442737554c36d4421b"
        }
      ],
      "thumbnail": {
        "path": "http://i.annihil.us/u/prod/marvel/i/mg/6/d0/598e2ab495a36",
        "extension": "jpg"
      },
      "images": [
        {
          "path": "http://i.annihil.us/u/prod/marvel/i/mg/6/d0/598e2ab495a36",
          "extension": "jpg"
        },
        {
          "path": "http://i.annihil.us/u/prod/marvel/i/mg/f/a0/4d641360a1713",
          "extension": "jpg"
        }
      ],
      "creators": {
        "available": 5,
        "collectionURI": "http://gateway.marvel.com/v1/public/comics/38756/creators",
        "items": [
          {
            "resourceURI": "http://gateway.marvel.com/v1/public/creators/750",
            "name": "David Aja",
            "role": "penciller (cover)"
          },
          {
            "resourceURI": "http://gateway.marvel.com/v1/public/creators/5251",
            "name": "Vc Joe Caramagna",
            "role": "letterer"
          },
          {
            "resourceURI": "http://gateway.marvel.com/v1/public/creators/1421",
            "name": "Tomm Coker",
            "role": "inker"
          },
          {
            "resourceURI": "http://gateway.marvel.com/v1/public/creators/8309",
            "name": "Daniel Freedman",
            "role": "colorist"
          },
          {
            "resourceURI": "http://gateway.marvel.com/v1/public/creators/94",
            "name": "Peter Milligan",
            "role": "writer"
          }
        ],
        "returned": 5
      }
    }),
    getComicCharacters: () => of(
      {
          "id": 1009718,
          "name": "Wolverine",
          "urls": [
              {
                  "type": "detail",
                  "url": "http://marvel.com/comics/characters/1009718/wolverine?utm_campaign=apiRef&utm_source=3b618f34d6259a442737554c36d4421b"
              },
              {
                  "type": "wiki",
                  "url": "http://marvel.com/universe/Wolverine_(James_Howlett)?utm_campaign=apiRef&utm_source=3b618f34d6259a442737554c36d4421b"
              },
              {
                  "type": "comiclink",
                  "url": "http://marvel.com/comics/characters/1009718/wolverine?utm_campaign=apiRef&utm_source=3b618f34d6259a442737554c36d4421b"
              }
          ]
      }
    )
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComicComponent, RouterTestingModule, HttpClientTestingModule],
      providers: [{ provider: MarvelApiService, useValue: mockMarvelApiService }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
