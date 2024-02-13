import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { SearchComponent } from './search/search.component';
import { CharacterComponent } from './character/character.component';
import { ComicComponent } from './comic/comic.component';

export const routes: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'search', component: SearchComponent },
    { path: 'character/:id', component: CharacterComponent },
    { path: 'comic/:id', component: ComicComponent},
    { path: '**', component: SearchComponent },
];
