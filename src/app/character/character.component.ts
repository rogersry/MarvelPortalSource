import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription, combineLatest, forkJoin, map, switchMap } from 'rxjs';
import { Character, Comic } from '../interfaces/marvel-interfaces';
import { MarvelApiService } from '../marvel-api.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css'
})
export class CharacterComponent implements OnInit, OnDestroy {
  private routeSub: Subscription = new Subscription;
  private characterAndComicsSub: Subscription = new Subscription;
  character!: Character;
  error: string = '';
  loading: boolean = true;
  comicsLoading: boolean = false;
  comics: Comic[] = [];
  comicsPage: number = 1;
  comicsPageSize: number = 20;
  comicsTotalPages: number = 1;
  comicsPageItemStart: number = 0;
  comicsPageItemEnd: number = 0;

  constructor(private activatedRoute: ActivatedRoute, private marvelApiService: MarvelApiService) {

  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.characterAndComicsSub.unsubscribe();
  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe( params => {
      let characterId = params['id'];

      let characterApiCall$ = this.marvelApiService.getCharacter(characterId);
      let comicsApiCall$ = this.marvelApiService.getComics(characterId, 0);

      this.characterAndComicsSub = combineLatest([characterApiCall$, comicsApiCall$]).subscribe(
        ([characterData, comicsData]) => {
          this.character = characterData;
          this.comics = comicsData;
          this.loading = false;
          this.comicsTotalPages = this.getTotalPageCount();
          console.log("Total pages: " + this.comicsTotalPages);
          this.comicsPage = 1;
        }
      );
    });
  }

  getTotalPageCount () : number
  {
    if(this.character.comics.available < this.comicsPageSize) {
      return 1;
    }
    return Math.ceil(this.character.comics.available / this.comicsPageSize);
  }

  getComicsPageItemStart() {
    if(this.character.comics.available === 0) {
      return 0;
    }

    if(this.comicsPage === 1) {
      return 1;
    }

    return ((this.comicsPage - 1) * this.comicsPageSize) + 1;
  }

  getComicsPageItemEnd() {
    if(this.character.comics.available === 0) {
      return 0;
    }
    
    // If we are on the last page, return the total comics count
    if(this.comicsPage === this.comicsTotalPages) {
      return this.character.comics.available;
    }

    return this.comicsPage * this.comicsPageSize;

  }

  comicsPreviousPage():void {
    if(this.comicsPage !== 1) {
      this.comicsLoading = true;
      this.comicsPage--;
      this.loadComicsPage();
    }
  }

  comicsNextPage():void {
    if(this.comicsPage !== this.comicsTotalPages) {
      this.comicsLoading = true;
      this.comicsPage++;
      this.loadComicsPage();
    }
  }

  loadComicsPage():void {
    this.marvelApiService.getComics(this.character.id, (this.comicsPage-1) * this.comicsPageSize).subscribe(comicsData => {
      this.comics = comicsData;
      this.comicsLoading = false;
    });
  }
}
