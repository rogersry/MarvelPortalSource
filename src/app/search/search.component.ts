import { Component } from '@angular/core';
import { MarvelApiService } from '../marvel-api.service';
import { Character } from '../interfaces/marvel-interfaces';
import { Router, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  error: string = '';
  characters: Character[] = [];
  loading: boolean = false;

  constructor(private marvelApiService: MarvelApiService, private router: Router) {
    
  }

  searchCharacter(characterName: string) {
    this.error = '';
    if(characterName.length > 0)
    {
      this.loading = true;
      this.marvelApiService.searchCharacters(characterName).subscribe(data => {
        this.characters = data;
        this.loading = false;
      });
    }
    else
    {
      this.error = "Search must have a value.";
    }
  }

  selectCharacter(id: number) {
      this.router.navigate(['character', id]);
  }
}
