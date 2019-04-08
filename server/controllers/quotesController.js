module.exports = {
  // storeAllQuotes: (req, res) => {
  //   const dbInstance = req.app.get('db');
  //   // console.log(req.body);
  //   for (let i = 0; i < req.body.length; i++) {
  //     // console.log(req.body[i]);
  //     dbInstance
  //       .store_all_quotes([
  //         req.body[i],
  //         req.body[i].split(' ').length,
  //         0,
  //         0,
  //         0,
  //         0,
  //         0
  //       ])
  //       .then(quote => {
  //         res.status(200);
  //       })
  //       .catch(error => {
  //         console.log('error with storeAllQuotes', error);
  //         res.status(500).send('Something went wrong on server');
  //       });
  //   }
  // },

  getSmallQuote: (req, res) => {
    const dbInstance = req.app.get('db');

    dbInstance
      .get_small_quote()
      .then(quotes => {
        res.status(200).send(quotes);
      })
      .catch(error => {
        console.log('error with getSmallQuote', error);
        res.status(500).send('Something went wrong on server');
      });
  },

  getMediumQuote: (req, res) => {
    const dbInstance = req.app.get('db');

    dbInstance
      .get_medium_quote()
      .then(quotes => {
        res.status(200).send(quotes);
      })
      .catch(error => {
        console.log('error with getMediumQuote', error);
        res.status(500).send('Something went wrong on server');
      });
  },

  getLargeQuote: (req, res) => {
    const dbInstance = req.app.get('db');

    dbInstance
      .get_large_quote()
      .then(quotes => {
        res.status(200).send(quotes);
      })
      .catch(error => {
        console.log('error with getLargeQuote', error);
        res.status(500).send('Something went wrong on server');
      });
  }
};
