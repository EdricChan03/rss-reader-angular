# Angular RSS Reader

An RSS reader with the following features:

* The ability to view an RSS feed
* The ability to read the latest headlines
* The ability to listen to podcasts from an RSS feed (coming soon!)

You can view the deployed website [here](https://edricchan03.github.io/rss-reader).

## Notes

* You'll need an API key for viewing an RSS feed (due to the restrictions that the Rss2Json API has). See this [document](./docs/guides/generate-api-key.md) for more info.

  * (Note that Rss2Json also currently limits the number of feed URLs you can pass to the API to be parsed - as of now, the limit is at 25 feed URLs.)

## About

The project was originally a fork of <https://github.com/becompany/angular2-rss-reader-tutorial>, but has now turned into a separate repository of its own.

### Technologies used

The project uses the following technologies listed below.

#### Frameworks

* [Angular](https://angular.io) for the underlying implementation
* [Angular Material](https://material.angular.io) for the design
* [Angular Flex-Layout](https://github.com/angular/flex-layout) for the declarative layout

#### APIs

* [Rss2Json](https://rss2json.com) for converting an RSS feed to a JSON representation
* [NewsAPI](https://newsapi.org) for providing headlines data
* [RestCountries](https://restcountries.eu) for providing country data

#### Continuous Integration (CI)/Continuous Deployment (CD) tools

* [GitHub Actions](https://github.com/features/actions) which was used for deploying the code on every push to the repository. You can view the [GitHub Action workflow](./.github/workflows/main.yml) I'd created.
* [angular-cli-ghpages](https://github.com/angular-schule/angular-cli-ghpages) for deploying the code to GitHub Pages

#### Other

* [Angular CLI](https://cli.angular.io) (You should be able to figure out what this was for)
* [Google Fonts](https://fonts.google.com) for their fonts. The [Merriweather](https://fonts.google.com/specimen/Merriweather) font is used for the site.
* [Google Analytics](https://analytics.google.com) for tracking visitor information
