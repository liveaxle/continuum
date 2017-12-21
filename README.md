# Continuum
![logo](https://avatars3.githubusercontent.com/u/30741101?s=200&v=4)

Domain Driven ideology for browser based applications.

***

## Install
`npm install --save @liveaxle/continuum`

***

## Compatbility 

* Node: `9.2.0` - but should work as low as 6.10
* Babel: Preset-Env should cover everything.
* Browsers: TBA (Chrome and FF, yes)

***

## Try

If you're interested to see how Continuum can be used in an ETL setting, fork this repository and check out the demo app!

* `git clone git@github.com:liveaxle/continuum.git`
* `cd continuum`
* `npm install`
* `npm run demo:seed`
* `npm run demo:server`

After that go to `http://localhost:9001` In your browser!
***

## Captain's Log

As someone who is not a fan of frameworks yet found themselves building the same core constructs every time I started a new project: I decided to put these ideas into something that made it easier for me to be consistent across endeavors. The result turned out to be more of a means of managing ETL semantically within a stateful application than a framework.

**Concepts**

Concept | Description
--- | ---
Semantic | *The core construct behind Continuum is a `domain`. A domain is simply a semantic way to group first-class entities of your application. Such as a `users` domain or a `vehicles` domain.*.
ETL | *Continuum was designed to make ETL in JS apps simpler and robust.*
Abstract | *The abstractions have been designed in a way that should enable you to use what components you feel necessary.*
Conventions | *The structures of Continuum seek to provide consistency in the way our code can be organized and abstracted.*

***

## Documentation

See the wiki for moar information.

***

## Contributing.

If you have some changes you would like to introduce, please submit a PR with notes detailing the contents, intentions and context of the change.
