module.exports = {
  rateCurrentQuote: (req, res) => {
    const dbInstance = req.app.get('db');

    // console.log('rateQuote-req.body', req.body);
    // console.log('rateQuote-req.params', req.params);

    const { name } = req.params;
    const { usersIPAddress } = req.body;
    const { id } = req.body.currentQuote;

    if (name === 'oneStar') {
      dbInstance
        .rate_one_star([id, usersIPAddress])
        .then(updatedQuote => {
          res.status(200).send(updatedQuote);
        })
        .catch(error => {
          console.log('error with rateCurrentQuote--rate_one_star', error);
          res.status(500).send('Something went wrong on server');
        });
    } else if (name === 'twoStars') {
      dbInstance
        .rate_two_stars([id, usersIPAddress])
        .then(updatedQuote => {
          res.status(200).send(updatedQuote);
        })
        .catch(error => {
          console.log('error with rateCurrentQuote--rate_two_stars', error);
          res.status(500).send('Something went wrong on server');
        });
    } else if (name === 'threeStars') {
      dbInstance
        .rate_three_stars([id, usersIPAddress])
        .then(updatedQuote => {
          res.status(200).send(updatedQuote);
        })
        .catch(error => {
          console.log('error with rateCurrentQuote--rate_three_stars', error);
          res.status(500).send('Something went wrong on server');
        });
    } else if (name === 'fourStars') {
      dbInstance
        .rate_four_stars([id, usersIPAddress])
        .then(updatedQuote => {
          res.status(200).send(updatedQuote);
        })
        .catch(error => {
          console.log('error with rateCurrentQuote--rate_four_stars', error);
          res.status(500).send('Something went wrong on server');
        });
    } else if (name === 'fiveStars') {
      dbInstance
        .rate_five_stars([id, usersIPAddress])
        .then(updatedQuote => {
          res.status(200).send(updatedQuote);
        })
        .catch(error => {
          console.log('error with rateCurrentQuote--rate_five_stars', error);
          res.status(500).send('Something went wrong on server');
        });
    }
  },
  getQuoteRaters: (req, res) => {
    const dbInstance = req.app.get('db');

    // console.log('req.params---', req.params);

    const { id } = req.params;

    dbInstance
      .get_quote_raters([id])
      .then(raters => {
        res.status(200).send(raters);
      })
      .catch(error => {
        console.log('error with getQuoteRaters', error);
        res.status(500).send('Something went wrong on server');
      });
  }
};
