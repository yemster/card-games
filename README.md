# card-games

This is an ongoing piece of work so checkout the commits for details of where this are.
You need to have `node.js` and `webpack` installed to run the app.

You can find details on installing Node here: https://nodejs.org/en/download/


##Getting started:

Clone the repo

Install webpack if not already available.
` npm install webpack -g`


Starting the app:
  `webpack --progress --colors --watch`


##What's implemented:
* Deck (WIP)


## Current TODOs (for Deck)
* JSDoc - auto generate documentation on code
* JSLinter - via webpack
* Test Suite
  * decide what to use.
  * Add tests for each function
  * Add test for Deck initialisation
    * Test for defaults
    * Test for options overides
* Create Card object for initialising cards
* convert to ES6

Done:
[√] Deck intializer
  [√] accept defaults
    [√] number of decks
    [√] jokers
    [√] include/exclude knights
  [√] Allow user overrides
    [√] Validate all defaults
    [√] clean and refactor validator code
[√] Respond to options hash:
  [√] number of decks
  [√] include jokers?
  [√] include knights
[√] humanised card Values
[√] shuffle function
[√] deal function
[√] Export as modules

##Next: Simple card card with play logic
* Snap game