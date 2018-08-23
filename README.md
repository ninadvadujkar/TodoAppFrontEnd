# TodoAppFrontEnd

This project is an Angular 5 App that is created using the angular cli. It has features as follows:
1. Login (due to absence of database, currently supports only one user)
'admin' is the username as well as the password
2. Add Todo
3. Show Todos
4. Delete Todos

2, 3 and 4 above are under a route named /home which is protected. Also, since all the APIs are token based that handling has been added to the app. App will send the user back to login page if wrong/invalid/expired token sent.

## Steps to start the application via live-reload webpack dev server

Note: These are the node and npm versions of my machine on which this App has been developed:
Node - 8.11.3
NPM - 5.6.0

Please make sure to start the server before starting this Angular App. Steps for the same are in that repo's README. Please find it below.
https://github.com/ninadvadujkar/TodoAppBackend

1. Clone this repository using below command

```sh
$ git clone https://github.com/ninadvadujkar/TodoAppFrontEnd.git
```

2. Install dependencies (will take some time as Angular has a lot fo dependencies)

```sh
$ cd TodoAppFrontEnd && npm install
```
The above command might not run on Windows due to presence of '&&'.
Execute the commands in two steps for Windows as follows:

```sh
$ cd TodoAppFrontEnd 
$ npm install
```

3. Start the webpack dev server

``` sh
$ npm start
```

After these steps the application will start and can be accessible on http://localhost:4200/

P.S. I wanted to add atleast a couple of unit tests but I couldn't get much time for it in the stipulated timeframe hence avoided it.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
