/*
  createDeck
    2D array to hold 4 suites containing 13 cards
    [heart  [1..13]]
    [spades [1..13]]
    [clubs  [1..13]]
    [diamomds [1..13]]
*/

/*
  TODO :: Task to completion
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

    [] JSDoc - auto generate documentation on code

    [] JSLinter - via webpack

    [] Test Suite
      [] decide what to use.
      [] Add tests for each function
      [] Add test for Deck initialisation
        [] Test for defaults
        [] Test for options overides

    [√] shuffle function
    [√] deal function
    [] Create Card object for initialising cards
    [] convert to ES6
    [√] Export as modules
*/


function Deck(options={}) {
  this.userOptions = options;
  this.init();
}

Deck.prototype = {
  defaultOptions: {
    decks: 1,
    jokers: 2,
    excludeKnights: true,
  },

  suites: [
    { name: 'spades',   hexPrefix: '1F0A', colour: 'black' },
    { name: 'hearts',   hexPrefix: '1F0B', colour: 'red' },
    { name: 'diamonds', hexPrefix: '1F0C', colour: 'red' },
    { name: 'clubs',    hexPrefix: '1F0D', colour: 'black' }
  ],
  jokerStyles: [
    { name:'red',    hex: '1F0BF' },
    { name: 'black', hex: '1F0CF' },
    { name:'white',  hex: '1F0DF' }
  ],
  cardBack: '1F0A0',


  init: function() {
    var deckToCreate = this.defaultOptions.decks;

    this.opts = this._validatedUserOption();
    this.cards = [];
    this.dealtCards = [];

    for (var d = this.opts.decks; d >= 1; d--)
      this.createDeck();

    console.log('%d Deck created. Boogie time %O', this.opts.decks, this.cards);
  },

  // Based on the Fisher-Yates (aka Knuth) Shuffle
  // source: https://bost.ocks.org/mike/shuffle/
  shuffle: function() {
    var s = this.cards.length, t, i;

    // While there remain elements to shuffle…
    while (s) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * s--);

      // And swap it with the current element.
      t = this.cards[s];
      this.cards[s] = this.cards[i];
      this.cards[i] = t;
    }
  },

  deal: function(quantity) {
    var qty = quantity || 1, card = {};

    if (this.cards.length) {
      card = this.cards.pop();
      this.dealtCards.push(card);
    }

    return card;
  },

  humanisedCardName: function(faceValue, suite) {
    var name = '';
    switch(faceValue) {
      case  0: name ='Ace'; break;
      case 10: name ='Jack'; break;
      case 11: name ='Knight'; break;
      case 12: name ='Queen'; break;
      case 13: name ='King'; break;
      default: name = faceValue + 1;
    }

    return name+' of '+suite.name;
  },

  createDeck: function() {
    for (var i = this.suites.length -1; i >= 0; i--) {
      var su = this.suites[i],
          prefix = '&#x' + su.hexPrefix,
          faceValues = [1,2,3,4,5,6,7,8,9,'A','B','C','D','E'];

      for (var n = faceValues.length -1; n >= 0; n--) {
        var addToStack = true;
        var card = {
              name: this.humanisedCardName(n, su),
              suite: su.name,
              hexface: prefix + faceValues[n],
              colour: su.colour
            }

        // push_to_stack unless card.is_a?(:knight) && opts.excludeKnights
        if (n === 11 && this.opts.excludeKnights)
          addToStack = false;

        if (addToStack)
          this.cards.push(card);
      };
    }

    if (this.opts.jokers) {
      for (var c = this.opts.jokers - 1; c >= 0; c--) {
        var jObj  = this.jokerStyles[c],
            color = jObj.name,
            card  = {
                      name: color + ' Joker',
                      suite: color,
                      hexface: prefix + jObj.hex,
                      colour: color
                    };
        this.cards.push(card);
      }
    }
  }, // end createDeck

  // VALIDATION: Validates user options to ensure valid. Reverts to default options where necessary.
  _validatedUserOption: function() {
    var _this = this,
        attrs = _.keys(this.userOptions),
        defOpts = this.defaultOptions,
        validatedOptions = this.userOptions;

    // console.log('User options BEFORE: ', validatedOptions)
    _.map(attrs, function(attr) {
      var attrToValidate = '_validates' + _.capitalize(attr)
      if (attrToValidate in _this)
        validatedOptions[attr] = _this[attrToValidate]()
    })
    // console.log('User options AFTER: ', validatedOptions)

    return _.defaults(validatedOptions, defOpts);
  },

  /*
    Naming convention for user options validators
      _validatesAttributeKeyHere

    For instance:
      opts = { foo: 'bar', somethingElse: 'baz' }

    dynamic validator methods would be
      _validatesFoo() ...
      _validatesSomethingElse() ....
  */
  _validatesDecks: function() {
    var valid = this.userOptions.decks;
    console.log('... DECKS validation required')
    if (!(_.isNumber(this.userOptions.decks) && this.userOptions.decks > 0)) {
      console.log('   ...... { deck: %d } FAILED X -  Falling back to default {deck: %d}', this.userOptions.decks, this.defaultOptions.decks);
      valid = this.defaultOptions.decks
    } else {
      console.log('   ...... { deck: %d } Passed ', this.userOptions.decks);
    }
    return valid
  },

  _validatesJokers: function() {
    var valid = this.userOptions.jokers

    console.log('... JOKERS validation required')
    if (!(_.includes([0,1,2,3], this.userOptions.jokers))) {
      console.log('   ...... { jokers: %d } FAILED X -  Falling back to default {jokers: %d}', this.userOptions.jokers, this.defaultOptions.jokers);
      valid = this.defaultOptions.jokers
    } else {
      console.log('   ...... { jokers: %d } Passed ', this.userOptions.jokers);
    }
    return valid;
  },

  _validatesExcludeKnights: function() {
    var valid = this.userOptions.excludeKnights

    console.log('... KNIGHTS validation required')
    if (!_.isBoolean(this.userOptions.excludeKnights)) {
      console.log('   ...... { excludeKnights: %O } FAILED X -  Falling back to default {excludeKnights: %O}', this.userOptions.excludeKnights, this.defaultOptions.excludeKnights);
      valid = this.defaultOptions.excludeKnights
    } else {
      console.log('   ...... { excludeKnights: %O } Passed ', this.userOptions.excludeKnights);
    }
    return valid;
  }

} // @end :: Deck.prototype()

module.exports = Deck
