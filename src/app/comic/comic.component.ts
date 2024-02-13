import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { MarvelApiService } from '../marvel-api.service';
import { Character, Comic, Image } from '../interfaces/marvel-interfaces';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-comic',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf],
  templateUrl: './comic.component.html',
  styleUrl: './comic.component.css'
})
export class ComicComponent implements OnInit, OnDestroy {
  comicAndCharactersSub: Subscription = new Subscription;
  comic!: Comic;
  error: string = '';
  routeSub: Subscription = new Subscription;
  slideshowImages: Image[] = [];
  slideIndex: number = 0;
  characters: Character[] = [];
  writers: string = "";
  constructor(private activatedRoute: ActivatedRoute, 
    private marvelApiService: MarvelApiService,
    private router: Router) {

  }
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.comicAndCharactersSub.unsubscribe();
  }
  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      let comicId = params['id'];

      let comicApiCall$ = this.marvelApiService.getComic(comicId);
      let comicCharactersApiCall$ = this.marvelApiService.getComicCharacters(comicId);

      this.comicAndCharactersSub = combineLatest([comicApiCall$, comicCharactersApiCall$]).subscribe(
        ([comicData, charactersData]) => {
          // Load the comic data
          this.comic = comicData;

          // Load images for the slideshow
          this.comic.images.forEach(value => {
            if (!this.slideshowImages.find((item) => item.path == value.path)) {
              this.slideshowImages.push(value);
            }
          });

          // Thumbnail is included in the images array if returned, so avoid duplicates
          if (this.slideshowImages.length == 0) {
            this.slideshowImages.push({ path: this.comic.thumbnail.path, extension: this.comic.thumbnail.extension });
          }

          this.writers = this.comic.creators.items.filter(creator => creator.role === 'writer').map(creator => creator.name).join(" , ");

          // Load the characters
          this.characters = charactersData;
        }
      );
    });
  }

  plusSlides(n: number) {
    let newSlideIndex = this.slideIndex + n;

    if (newSlideIndex > this.slideshowImages.length - 1) {
      this.slideIndex = 0;
    }
    else if (newSlideIndex < 0) {
      this.slideIndex = this.slideshowImages.length - 1;
    }
    else {
      this.slideIndex = newSlideIndex;
    }
  }

  currentSlide(n: number) {
    this.slideIndex = n;
  }

  selectCharacter(id: number) {
    this.router.navigate(['character', id]);
  }
}
