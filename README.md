# Expressoh

An alternative approach to testing js with mocha, chai, nock, and others!

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You should hopefully know what testing is, and how annoying it is to create tests quickly.

### Installing

To get your very own copy of expressoh install it in the usual way!

```
npm install expressoh
```

To add it into your project

```
npm install expressoh --save
```
OR
```
npm install expressoh --save-dev
```

## Running the tests

From your project root, to run examples for testing facility and http

```
cd node_modules/expressoh
mocha
```

### Viewing test results

[mochawesome-report-generator](https://github.com/adamgruber/mochawesome-report-generator) is used to generate an html page with test results. Browse to

```
expressoh/mochawesome-report/mochawesome.html
```

Then open a web browser with this html file to see your results. 

### Creating your own tests

Examples for how to write expressoh tests can be found in the examples folder...
```
cd node_modules/expressoh/examples
```

When ready to

## Contributing

To contribute to this project, follow [common standards](https://gist.github.com/PurpleBooth/b24679402957c63ec426)

## Versioning

We use [NodeJS](https://nodejs.org/en) for versioning. For the versions available, see the [tags on this repository](https://github.com/jjenki11/expressoh/tags). 

## Authors

* **Jeff Jenkins** - ** - [jjenki11](https://github.com/jjenki11)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* libphonenumber-js
* validator
* mocha
* nock
* chai