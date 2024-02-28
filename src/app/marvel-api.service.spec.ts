import { TestBed } from '@angular/core/testing';
import { MarvelApiService } from './marvel-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Character, Comic } from './interfaces/marvel-interfaces';

describe('MarvelApiService', () => {
  let service: MarvelApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MarvelApiService]
    });
    // Inject the http service and test controller for each test
    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(MarvelApiService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('searchCharacters', () => {
    it('should return character array', () => {
      let responseCharacterArray: Character[] | undefined;
      service.searchCharacters('wolverine').subscribe(response => {
        responseCharacterArray = response;
      });
      const req = httpTestingController.expectOne('https://gateway.marvel.com/v1/public/characters?nameStartsWith=wolverine&apikey=3b618f34d6259a442737554c36d4421b');
      req.flush({
        "data": {
          "results": [wolverineCharacter, wolverineLegoCharacter]
        }
      });
      expect(responseCharacterArray).toContain(jasmine.objectContaining(wolverineCharacter));
      expect(responseCharacterArray).toContain(jasmine.objectContaining(wolverineLegoCharacter));
    })
  })

  describe('getCharacter', () => {


    it('should return a character', () => {
      let responseCharacter: Character | undefined;
      service.getCharacter(1009718).subscribe((response) => {
        responseCharacter = response;
      });
      const req = httpTestingController.expectOne('https://gateway.marvel.com/v1/public/characters/1009718?apikey=3b618f34d6259a442737554c36d4421b');
      req.flush({
        "data": {
          "results": [
            wolverineCharacter
          ]
        }
      });
      expect(responseCharacter).toBe(wolverineCharacter);
    })
  });

  describe('getComic', () => {
    it('should return a comic', () => {
      let responseComic: Comic | undefined;
      service.getComic(38756).subscribe(response => {
        responseComic = response;
      })
      const req = httpTestingController.expectOne('https://gateway.marvel.com/v1/public/comics/38756?apikey=3b618f34d6259a442737554c36d4421b');
      req.flush({
        "data": {
          "results": [
            wolverineComic1
          ]
        }
      });
      expect(responseComic).toBe(wolverineComic1);
    })
  })

  describe('getComics', () => {
    it('should return comic array', () =>{
      let responseComicsAraray:Comic[]|undefined;
      service.getComics(1009718, 0).subscribe(response => {
        responseComicsAraray = response;
      })
      const req = httpTestingController.expectOne('https://gateway.marvel.com/v1/public/characters/1009718/comics?orderBy=title&limit=20&offset=0&apikey=3b618f34d6259a442737554c36d4421b');
      req.flush({
        "data": {
          "results": [wolverineComic1, wolverineComic2]
        }
      });
      expect(responseComicsAraray).toContain(jasmine.objectContaining(wolverineComic1));
      expect(responseComicsAraray).toContain(jasmine.objectContaining(wolverineComic2));
    });
  });

  describe('getComicCharacters', () => {
    it('should return a comic character array', () => {
      let responseComicCharacterArray:Character[]|undefined;
      service.getComicCharacters(43467).subscribe(response => {
        responseComicCharacterArray = response;
      })
      const req = httpTestingController.expectOne('https://gateway.marvel.com/v1/public/comics/43467/characters?apikey=3b618f34d6259a442737554c36d4421b');
      req.flush({
        "data": {
          "results": [wolverineCharacter, xmenCharacter]
        }
      });
      expect(responseComicCharacterArray).toContain(jasmine.objectContaining(wolverineCharacter));
      expect(responseComicCharacterArray).toContain(jasmine.objectContaining(xmenCharacter));
    })
  })

  const wolverineCharacter: Character = {
    "id": 1009718,
    "name": "Wolverine",
    "description": "Born with super-human senses and the power to heal from almost any wound, Wolverine was captured by a secret Canadian organization and given an unbreakable skeleton and claws. Treated like an animal, it took years for him to control himself. Now, he's a premiere member of both the X-Men and the Avengers.",
    "modified": "2016-05-02T12:21:44-0400",
    "thumbnail": {
      "path": "http://i.annihil.us/u/prod/marvel/i/mg/2/60/537bcaef0f6cf",
      "extension": "jpg"
    },
    "resourceURI": "http://gateway.marvel.com/v1/public/characters/1009718",
    "comics": {
      "available": 2680,
      "collectionURI": "http://gateway.marvel.com/v1/public/characters/1009718/comics",
      "items": [
        {
          "resourceURI": "http://gateway.marvel.com/v1/public/comics/41113",
          "name": "5 Ronin (Hardcover)"
        }
      ],
      "returned": 1
    },
    "series": {
      "available": 743,
      "collectionURI": "http://gateway.marvel.com/v1/public/characters/1009718/series",
      "items": [
        {
          "resourceURI": "http://gateway.marvel.com/v1/public/series/12429",
          "name": "5 Ronin (2010)"
        }
      ],
      "returned": 1
    },
    "stories": {
      "available": 3694,
      "collectionURI": "http://gateway.marvel.com/v1/public/characters/1009718/stories",
      "items": [
        {
          "resourceURI": "http://gateway.marvel.com/v1/public/stories/459",
          "name": "Featuring the return of legendary X-Men artist Marc Silvestri. In a tale inspired by the classic",
          "type": "cover"
        }
      ],
      "returned": 1
    },
    "events": {
      "available": 42,
      "collectionURI": "http://gateway.marvel.com/v1/public/characters/1009718/events",
      "items": [
        {
          "resourceURI": "http://gateway.marvel.com/v1/public/events/116",
          "name": "Acts of Vengeance!"
        }
      ],
      "returned": 1
    },
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
  };

  const wolverineLegoCharacter = {
    "id": 1017297,
    "name": "Wolverine (LEGO Marvel Super Heroes)",
    "description": "",
    "modified": "2013-09-18T11:16:20-0400",
    "thumbnail": {
      "path": "http://i.annihil.us/u/prod/marvel/i/mg/6/00/5239c3b29cb40",
      "extension": "jpg"
    },
    "resourceURI": "http://gateway.marvel.com/v1/public/characters/1017297",
    "comics": {
      "available": 0,
      "collectionURI": "http://gateway.marvel.com/v1/public/characters/1017297/comics",
      "items": [],
      "returned": 0
    },
    "series": {
      "available": 0,
      "collectionURI": "http://gateway.marvel.com/v1/public/characters/1017297/series",
      "items": [],
      "returned": 0
    },
    "stories": {
      "available": 0,
      "collectionURI": "http://gateway.marvel.com/v1/public/characters/1017297/stories",
      "items": [],
      "returned": 0
    },
    "events": {
      "available": 0,
      "collectionURI": "http://gateway.marvel.com/v1/public/characters/1017297/events",
      "items": [],
      "returned": 0
    },
    "urls": [
      {
        "type": "detail",
        "url": "http://marvel.com/characters/66/wolverine?utm_campaign=apiRef&utm_source=3b618f34d6259a442737554c36d4421b"
      },
      {
        "type": "comiclink",
        "url": "http://marvel.com/comics/characters/1017297/wolverine_lego_marvel_super_heroes?utm_campaign=apiRef&utm_source=3b618f34d6259a442737554c36d4421b"
      }
    ]
  };

  const xmenCharacter = {
    "id": 1009726,
    "name": "X-Men",
    "description": "Feared and hated by humans because they're different, the X-Men are heroic mutants, individuals born with special powers who've sworn to use their gifts to protect mutants as well as humans.",
    "modified": "2017-01-24T15:44:42-0500",
    "thumbnail": {
        "path": "http://i.annihil.us/u/prod/marvel/i/mg/8/03/510c08f345938",
        "extension": "jpg"
    },
    "resourceURI": "http://gateway.marvel.com/v1/public/characters/1009726",
    "comics": {
        "available": 3996,
        "collectionURI": "http://gateway.marvel.com/v1/public/characters/1009726/comics",
        "items": [
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/comics/17701",
                "name": "Age of Apocalypse: The Chosen (1995) #1"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/comics/20630",
                "name": "1602 (2003) #1"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/comics/50114",
                "name": "1602 (2003) #2"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/comics/377",
                "name": "1602 (2003) #3"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/comics/148",
                "name": "1602 (2003) #4"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/comics/102808",
                "name": "A.X.E.: Eve Of Judgment (2022) #1"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/comics/100748",
                "name": "A.X.E.: Judgment Day (Trade Paperback)"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/comics/100366",
                "name": "A.X.E.: Judgment Day (2022) #1"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/comics/100367",
                "name": "A.X.E.: Judgment Day (2022) #2"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/comics/102807",
                "name": "A.X.E.: Judgment Day (2022) #6"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/comics/102866",
                "name": "A.X.E.: Judgment Day Companion (Trade Paperback)"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/comics/104869",
                "name": "A.X.E.: Judgment Day Omega (2022) #1"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/comics/102810",
                "name": "A.X.E.: X-Men (2022) #1"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/comics/76877",
                "name": "Adventures of the X-Men (1996) #3"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/comics/76881",
                "name": "Adventures of the X-Men (1996) #7"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/comics/76882",
                "name": "Adventures of the X-Men (1996) #8"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/comics/76883",
                "name": "Adventures of the X-Men (1996) #9"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/comics/76884",
                "name": "Adventures of the X-Men (1996) #10"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/comics/76885",
                "name": "Adventures of the X-Men (1996) #11"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/comics/76886",
                "name": "Adventures of the X-Men (1996) #12"
            }
        ],
        "returned": 20
    },
    "series": {
        "available": 1020,
        "collectionURI": "http://gateway.marvel.com/v1/public/characters/1009726/series",
        "items": [
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/series/489",
                "name": "1602 (2003 - 2004)"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/series/35456",
                "name": "A.X.E.: Eve Of Judgment (2022)"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/series/34560",
                "name": "A.X.E.: Judgment Day (2023)"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/series/34459",
                "name": "A.X.E.: Judgment Day (2022)"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/series/35490",
                "name": "A.X.E.: Judgment Day Companion (2023)"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/series/36268",
                "name": "A.X.E.: Judgment Day Omega (2022)"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/series/35458",
                "name": "A.X.E.: X-Men (2022)"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/series/27588",
                "name": "Adventures of the X-Men (1996 - 1997)"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/series/27040",
                "name": "Adventures Of The X-Men: Clear And Present Dangers (2019)"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/series/27673",
                "name": "Adventures Of The X-Men: Rites Of Passage (2019)"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/series/15331",
                "name": "Age of Apocalypse (2012 - 2013)"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/series/3614",
                "name": "Age of Apocalypse: The Chosen (1995)"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/series/26328",
                "name": "Age of X-Man Alpha (2019)"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/series/26329",
                "name": "Age Of X-Man Omega (2019)"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/series/26335",
                "name": "Age of X-Man: Apocalypse & the X-Tracts (2019)"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/series/26376",
                "name": "Age Of X-Man: Apocalypse & The X-Tracts (2019)"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/series/26331",
                "name": "Age of X-Man: Nextgen (2019)"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/series/26375",
                "name": "Age Of X-Man: Prisoner X (2019)"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/series/26334",
                "name": "Age of X-Man: Prisoner X (2019)"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/series/26371",
                "name": "Age Of X-Man: The Marvelous X-Men (2019)"
            }
        ],
        "returned": 20
    },
    "stories": {
        "available": 5672,
        "collectionURI": "http://gateway.marvel.com/v1/public/characters/1009726/stories",
        "items": [
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/stories/472",
                "name": "Interior #472",
                "type": "interiorStory"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/stories/478",
                "name": "Interior #478",
                "type": "interiorStory"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/stories/492",
                "name": "Interior #492",
                "type": "interiorStory"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/stories/495",
                "name": "Interior #495",
                "type": "interiorStory"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/stories/501",
                "name": "Interior #501",
                "type": "interiorStory"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/stories/503",
                "name": "Interior #503",
                "type": "interiorStory"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/stories/515",
                "name": "Interior #515",
                "type": "interiorStory"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/stories/594",
                "name": "X-MEN (2004) #164",
                "type": "cover"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/stories/595",
                "name": "4 of 4 - Heroes and Villains",
                "type": "interiorStory"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/stories/603",
                "name": "Interior #603",
                "type": "interiorStory"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/stories/609",
                "name": "Interior #609",
                "type": "interiorStory"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/stories/611",
                "name": "Interior #611",
                "type": "interiorStory"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/stories/613",
                "name": "Interior #613",
                "type": "interiorStory"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/stories/614",
                "name": "X-MEN (2004) #159",
                "type": "cover"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/stories/615",
                "name": "Interior #615",
                "type": "interiorStory"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/stories/616",
                "name": "X-MEN (2004) #157",
                "type": "cover"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/stories/617",
                "name": "Interior #617",
                "type": "interiorStory"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/stories/618",
                "name": "X-MEN (2004) #158",
                "type": "cover"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/stories/619",
                "name": "Interior #619",
                "type": "interiorStory"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/stories/620",
                "name": "X-MEN (2004) #160",
                "type": "cover"
            }
        ],
        "returned": 20
    },
    "events": {
        "available": 42,
        "collectionURI": "http://gateway.marvel.com/v1/public/characters/1009726/events",
        "items": [
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/events/116",
                "name": "Acts of Vengeance!"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/events/227",
                "name": "Age of Apocalypse"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/events/314",
                "name": "Age of Ultron"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/events/303",
                "name": "Age of X"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/events/233",
                "name": "Atlantis Attacks"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/events/310",
                "name": "Avengers VS X-Men"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/events/320",
                "name": "Axis"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/events/296",
                "name": "Chaos War"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/events/238",
                "name": "Civil War"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/events/318",
                "name": "Dark Reign"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/events/240",
                "name": "Days of Future Present"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/events/245",
                "name": "Enemy of the State"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/events/246",
                "name": "Evolutionary War"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/events/248",
                "name": "Fall of the Mutants"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/events/249",
                "name": "Fatal Attractions"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/events/302",
                "name": "Fear Itself"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/events/251",
                "name": "House of M"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/events/252",
                "name": "Inferno"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/events/29",
                "name": "Infinity War"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/events/317",
                "name": "Inhumanity"
            }
        ],
        "returned": 20
    },
    "urls": [
        {
            "type": "detail",
            "url": "http://marvel.com/comics/characters/1009726/x-men?utm_campaign=apiRef&utm_source=3b618f34d6259a442737554c36d4421b"
        },
        {
            "type": "wiki",
            "url": "http://marvel.com/universe/X-Men?utm_campaign=apiRef&utm_source=3b618f34d6259a442737554c36d4421b"
        },
        {
            "type": "comiclink",
            "url": "http://marvel.com/comics/characters/1009726/x-men?utm_campaign=apiRef&utm_source=3b618f34d6259a442737554c36d4421b"
        }
    ]
};

  const wolverineComic1 = {
    "id": 38756,
    "digitalId": 19853,
    "title": "5 Ronin (2010) #1",
    "issueNumber": 1,
    "variantDescription": "",
    "description": "17th century Japan: a time and place of violent upheaval. Into this strange and dangerous world come Wolverine, Pyslocke, Punisher, Hulk and Deadpool. Five of Marvel's greatest heroes as you've never seen them before!",
    "modified": "2021-08-23T16:20:26-0400",
    "isbn": "",
    "upc": "75960607394800121",
    "diamondCode": "NOV108268",
    "ean": "",
    "issn": "",
    "format": "Comic",
    "pageCount": 32,
    "textObjects": [
      {
        "type": "issue_solicit_text",
        "language": "en-us",
        "text": "5 Books, 5 Heroes-1 unforgettable story of heroes pushed to their limits.  It is 17th century Japan, a time and place of violent upheaval, wandering Ronin, and mysterious Geisha. Into this strange and dangerous world come Wolverine, Pyslocke, Punisher, Hulk and Deadpool. Five of Marvel's greatest heroes...as you've never seen them before. Each has been wronged by a powerful tyrant. Each has taken a solemn vow...of vengeance!\n5 Books, 5 Heroes, 5 Weeks...1 spell-binding story."
      },
      {
        "type": "issue_preview_text",
        "language": "en-us",
        "text": "17th century Japan: a time and place of violent upheaval. Into this strange and dangerous world come Wolverine, Pyslocke, Punisher, Hulk and Deadpool. Five of Marvel's greatest heroes as you've never seen them before!"
      }
    ],
    "resourceURI": "http://gateway.marvel.com/v1/public/comics/38756",
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
    "series": {
      "resourceURI": "http://gateway.marvel.com/v1/public/series/12429",
      "name": "5 Ronin (2010)"
    },
    "variants": [
      {
        "resourceURI": "http://gateway.marvel.com/v1/public/comics/36162",
        "name": "5 Ronin (2010) #1 (Variant)"
      }
    ],
    "collections": [],
    "collectedIssues": [],
    "dates": [
      {
        "type": "onsaleDate",
        "date": "2011-03-02T00:00:00-0500"
      },
      {
        "type": "focDate",
        "date": "-0001-11-30T00:00:00-0500"
      },
      {
        "type": "unlimitedDate",
        "date": "2012-02-07T00:00:00-0500"
      },
      {
        "type": "digitalPurchaseDate",
        "date": "2011-03-29T00:00:00-0400"
      }
    ],
    "prices": [
      {
        "type": "printPrice",
        "price": 2.99
      },
      {
        "type": "digitalPurchasePrice",
        "price": 1.99
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
    },
    "characters": {
      "available": 1,
      "collectionURI": "http://gateway.marvel.com/v1/public/comics/38756/characters",
      "items": [
        {
          "resourceURI": "http://gateway.marvel.com/v1/public/characters/1009718",
          "name": "Wolverine"
        }
      ],
      "returned": 1
    },
    "stories": {
      "available": 2,
      "collectionURI": "http://gateway.marvel.com/v1/public/comics/38756/stories",
      "items": [
        {
          "resourceURI": "http://gateway.marvel.com/v1/public/stories/89879",
          "name": "5 Ronin #1",
          "type": "cover"
        },
        {
          "resourceURI": "http://gateway.marvel.com/v1/public/stories/89880",
          "name": "5 Ronin #1 ",
          "type": "interiorStory"
        }
      ],
      "returned": 2
    },
    "events": {
      "available": 0,
      "collectionURI": "http://gateway.marvel.com/v1/public/comics/38756/events",
      "items": [],
      "returned": 0
    }
  };

  const wolverineComic2 = {
    "id": 43467,
    "digitalId": 28118,
    "title": "All-New X-Men (2012) #2",
    "issueNumber": 2,
    "variantDescription": "",
    "description": "Professor X's five original students have been flung from the past to present day. While they cope with an unimaginable future (especially considering the fallout of AVX), how will today's X-Men justify their actions to their past selves?",
    "modified": "2014-05-15T17:54:37-0400",
    "isbn": "",
    "upc": "75960607900100211",
    "diamondCode": "SEP120548",
    "ean": "",
    "issn": "",
    "format": "Comic",
    "pageCount": 32,
    "textObjects": [
      {
        "type": "issue_solicit_text",
        "language": "en-us",
        "text": "It&rsquo;s a blast from the past as the original five students of Professor X &ndash; Cyclops, Marvel Girl, Iceman, Angel and Beast &ndash; are plucked from the past and brought to the present. But what they find, the state that their future selves are in and the state of Xavier&rsquo;s dream, is far from the future they dreamed of. And how will the X-Men of the present deal with their past coming crashing forward?"
      },
      {
        "type": "issue_preview_text",
        "language": "en-us",
        "text": "Professor X's five original students have been flung from the past to present day. While they cope with an unimaginable future (especially considering the fallout of AVX), how will today's X-Men justify their actions to their past selves?"
      }
    ],
    "resourceURI": "http://gateway.marvel.com/v1/public/comics/43467",
    "urls": [
      {
        "type": "detail",
        "url": "http://marvel.com/comics/issue/43467/all-new_x-men_2012_2?utm_campaign=apiRef&utm_source=3b618f34d6259a442737554c36d4421b"
      },
      {
        "type": "purchase",
        "url": "http://comicstore.marvel.com/All-New-X-Men-2/digital-comic/28118?utm_campaign=apiRef&utm_source=3b618f34d6259a442737554c36d4421b"
      },
      {
        "type": "reader",
        "url": "http://marvel.com/digitalcomics/view.htm?iid=28118&utm_campaign=apiRef&utm_source=3b618f34d6259a442737554c36d4421b"
      },
      {
        "type": "inAppLink",
        "url": "https://applink.marvel.com/issue/28118?utm_campaign=apiRef&utm_source=3b618f34d6259a442737554c36d4421b"
      }
    ],
    "series": {
      "resourceURI": "http://gateway.marvel.com/v1/public/series/16449",
      "name": "All-New X-Men (2012 - 2015)"
    },
    "variants": [
      {
        "resourceURI": "http://gateway.marvel.com/v1/public/comics/47626",
        "name": "All-New X-Men (2012) #2 (3rd Printing Variant)"
      },
      {
        "resourceURI": "http://gateway.marvel.com/v1/public/comics/47321",
        "name": "All-New X-Men (2012) #2 (2nd Printing Variant)"
      }
    ],
    "collections": [],
    "collectedIssues": [],
    "dates": [
      {
        "type": "onsaleDate",
        "date": "2012-11-28T00:00:00-0500"
      },
      {
        "type": "focDate",
        "date": "2012-11-14T00:00:00-0500"
      },
      {
        "type": "unlimitedDate",
        "date": "2013-05-27T00:00:00-0400"
      },
      {
        "type": "digitalPurchaseDate",
        "date": "2012-11-28T00:00:00-0500"
      }
    ],
    "prices": [
      {
        "type": "printPrice",
        "price": 3.99
      },
      {
        "type": "digitalPurchasePrice",
        "price": 1.99
      }
    ],
    "thumbnail": {
      "path": "http://i.annihil.us/u/prod/marvel/i/mg/c/50/584b138ada8af",
      "extension": "jpg"
    },
    "images": [
      {
        "path": "http://i.annihil.us/u/prod/marvel/i/mg/c/50/584b138ada8af",
        "extension": "jpg"
      }
    ],
    "creators": {
      "available": 9,
      "collectionURI": "http://gateway.marvel.com/v1/public/comics/43467/creators",
      "items": [
        {
          "resourceURI": "http://gateway.marvel.com/v1/public/creators/4014",
          "name": "Axel Alonso",
          "role": "editor"
        },
        {
          "resourceURI": "http://gateway.marvel.com/v1/public/creators/4300",
          "name": "Nick Lowe",
          "role": "editor"
        },
        {
          "resourceURI": "http://gateway.marvel.com/v1/public/creators/8822",
          "name": "Jordan D. White",
          "role": "editor"
        },
        {
          "resourceURI": "http://gateway.marvel.com/v1/public/creators/24",
          "name": "Brian Michael Bendis",
          "role": "writer"
        },
        {
          "resourceURI": "http://gateway.marvel.com/v1/public/creators/452",
          "name": "Virtual Calligr",
          "role": "letterer"
        },
        {
          "resourceURI": "http://gateway.marvel.com/v1/public/creators/361",
          "name": "Cory Petit",
          "role": "letterer"
        },
        {
          "resourceURI": "http://gateway.marvel.com/v1/public/creators/872",
          "name": "Marte Gracia",
          "role": "colorist"
        },
        {
          "resourceURI": "http://gateway.marvel.com/v1/public/creators/552",
          "name": "Wade Von Grawbadger",
          "role": "inker (cover)"
        },
        {
          "resourceURI": "http://gateway.marvel.com/v1/public/creators/192",
          "name": "Stuart Immonen",
          "role": "penciler (cover)"
        }
      ],
      "returned": 9
    },
    "characters": {
      "available": 3,
      "collectionURI": "http://gateway.marvel.com/v1/public/comics/43467/characters",
      "items": [
        {
          "resourceURI": "http://gateway.marvel.com/v1/public/characters/1009508",
          "name": "Kitty Pryde"
        },
        {
          "resourceURI": "http://gateway.marvel.com/v1/public/characters/1009718",
          "name": "Wolverine"
        },
        {
          "resourceURI": "http://gateway.marvel.com/v1/public/characters/1009726",
          "name": "X-Men"
        }
      ],
      "returned": 3
    },
    "stories": {
      "available": 2,
      "collectionURI": "http://gateway.marvel.com/v1/public/comics/43467/stories",
      "items": [
        {
          "resourceURI": "http://gateway.marvel.com/v1/public/stories/97120",
          "name": "All-New X-Men (2012) #2",
          "type": "cover"
        },
        {
          "resourceURI": "http://gateway.marvel.com/v1/public/stories/97121",
          "name": "story from A+X (2012) #1",
          "type": "interiorStory"
        }
      ],
      "returned": 2
    },
    "events": {
      "available": 0,
      "collectionURI": "http://gateway.marvel.com/v1/public/comics/43467/events",
      "items": [],
      "returned": 0
    }
  };
});
