# MarvelPortal

I created this Angular application to search Marvel characters and comics.  It is a work in progress and I use it to play with latest Angular updates.  I plan to add more features in the future.

You can view the deployed web here: https://rogersry.github.io/MarvelPortal/

## Docker

You can run this angular app in a docker container:
1. Download and Install Docker Desktop
2. Run in terminal:  docker build -t marvel-portal-source .
3. Run in terminal:  docker run -d -p 4201:4200 marvel-portal-source
4. Visit this in your browser:  http://localhost:4201/

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
