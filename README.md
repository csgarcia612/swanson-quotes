[![Quote Length Pop Up Graphic](https://i.imgur.com/AZEn5LH.png)]()

# Ron Swanson Quotes
A randomized quote generation we application built as part of a coding challenge. 

Users can rate all quotes based on a 5-star rating system and see the average rating of each quote when they appear on screen.

Uses the “Ron Swanson Quotes API” - <a href="https://github.com/jamesseanwright/ron-swanson-quotes#ron-swanson-quotes-api">https://github.com/jamesseanwright/ron-swanson-quotes#ron-swanson-quotes-api</a>.


---


## Table of Contents (Optional)

- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)


---


## Installation

- All the `code` required to get started
- Images of what it should look like

### Clone

> Clone this repo to your local machine using `https://github.com/csgarcia612/swanson-quotes.git`

```shell
$ git clone https://github.com/csgarcia612/swanson-quotes.git
```

### Setup

> Install npm packages

```shell
$ npm install
```

### Database

> Create a PostgreSQL database and use the file "<a href="https://github.com/csgarcia612/swanson-quotes/blob/master/db/init.sql">init.sql</a>" in the "db" folder within this repository to create the correct tables in the database.


---


## Usage

- Click on the image of the character "Ron Swanson" to activate the pop up to choose the length of the quote generated.

[![Quote Length Pop Up Graphic](https://i.imgur.com/rQOIUE0.png)]()

- After selecting a quote length preference, a randomly selected quote will appear on screen.

- The average rating of the quote will appear below the quote as well. This is determined by the ratings all users give the quote when they have it generated for them. The rating is based on a 5-star system.

- If there is an average rating for the quote, it will appear as a number of silhouettes of the character Ron Swanson.

[![Quote With Average Rating Graphic](https://i.imgur.com/c4amdpS.png)]()

- If there is no average rating for the quote, there will only be black dots in place of the silhouettes.

[![Quote Without Average Rating Graphic](https://i.imgur.com/T1ppZua.png)]()

- The "Rate Quote" button will only appear for quotes the specific user has not rated yet.

- Click on the "Rate Quote" button to activate the pop up to rate the quote between 1 and 5.

[![Quote Without Average Rating Graphic](https://i.imgur.com/GffTCE0.png)]()


## Documentation

- The application does not have a traditional login function. Instead it uses the users IP address to save quote ratings into the database.

- The application generates the average rating for each quote when it appears on screen. I accomplished this by using the following code.

```javascript
getQuoteAvgRating() {
    const { currentQuote } = this.state;

    if (
      currentQuote.five_star +
        currentQuote.four_star +
        currentQuote.three_star +
        currentQuote.two_star +
        currentQuote.one_star !==
      0
    ) {
      let averageRating = Math.round(
        (5 * currentQuote.five_star +
          4 * currentQuote.four_star +
          3 * currentQuote.three_star +
          2 * currentQuote.two_star +
          1 * currentQuote.one_star) /
          (currentQuote.five_star +
            currentQuote.four_star +
            currentQuote.three_star +
            currentQuote.two_star +
            currentQuote.one_star)
      );

      this.setState({
        quoteAverageRating: averageRating
      });
    } else {
      this.setState({
        quoteAverageRating: 0
      });
    }
  }
```
