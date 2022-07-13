# bad-word-ar

A more relaxed javascript filter for badwords. 

## Installation

    npm install bad-word-ar

## Usage

    var Filter = require('bad-word-ar'),
      filter = new Filter('ar');

    console.log(filter.clean("الله يلعنك")); 
    //الله *****

### check 
    
    var Filter = require('bad-word-ar'),
      filter = new Filter('ar');

    console.log(filter.check("يلعن ابوك")); 
    //true

    console.log(filter.check("مرحبا بك")); 
    //false

### check 
    
    var Filter = require('bad-word-ar'),
      filter = new Filter('ar');

    console.log(filter.count("الله يلعنك")); 
    //1

    console.log(filter.check("مرحبا بك")); 
    //0


#### Filter

Filter constructor.

**Parameters**

- 
-    `list` **[array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** Instantiate filter with custom list
    

##### isProfaneLike

Determine if a single word is profane or looks profane.

**Parameters**

-   `word` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** String to evaluate for profanity.

##### replaceWord

Replace a word with placeHolder characters;

**Parameters**

-   `string` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** String to replace.

##### clean

Evaluate a string for profanity and return an edited version.

**Parameters**

-   `string` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Sentence to filter.

##### count

Count a string for profanity and return the count.

**Parameters**

-   `string` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Sentence to filter.

##### check

Check a string for profanity and return an Boolean value.

**Parameters**

-   `string` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Sentence to filter.



