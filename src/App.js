import React, { Component } from 'react';
import './App.scss';
import ronSwansonPic from './images/ronSwansonPic.jpg';
import swansonSilhouette from './images/swansonSilhouette.png';
import dot from './images/dot.png';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      showQuoteModal: false,
      showRatingModal: false,
      showRatingBtn: true,
      currentQuote: '',
      usersIPAddress: null,
      quoteAverageRating: null,
      quoteRaters: null
    };
    this.getUsersIPAddress = this.getUsersIPAddress.bind(this);
    // this.getAllQuotes = this.getAllQuotes.bind(this);
    this.getSmallQuote = this.getSmallQuote.bind(this);
    this.getMediumQuote = this.getMediumQuote.bind(this);
    this.getLargeQuote = this.getLargeQuote.bind(this);
    this.toggleQuoteModal = this.toggleQuoteModal.bind(this);
    this.toggleRatingModal = this.toggleRatingModal.bind(this);
    this.getRaters = this.getRaters.bind(this);
    this.getQuoteAvgRating = this.getQuoteAvgRating.bind(this);
    this.rateCurrentQuote = this.rateCurrentQuote.bind(this);
  }

  componentDidMount() {
    // this.getAllQuotes();
    this.getUsersIPAddress();
  }

  getUsersIPAddress() {
    var ip = require('ip');
    // console.log(ip.address());
    let userIP = ip.address();
    // console.log('userIP', userIP);

    this.setState({
      usersIPAddress: userIP
    });
  }

  // getAllQuotes() {
  //   axios
  //     .get('https://ron-swanson-quotes.herokuapp.com/v2/quotes/100')
  //     .then(results => {
  //       console.log('All Quotes--', results);
  //       axios
  //         .post('/api/allQuotes', results.data)
  //         .then(response => {
  //           console.log('All Quotes Response: ', response);
  //         })
  //         .catch(error => {
  //           console.log('error with posting to db: ', error);
  //         });
  //     });
  // }

  getRaters() {
    const { id } = this.state.currentQuote;
    const { usersIPAddress } = this.state;

    // console.log('getRaters---id', id);

    axios
      .get(`/api/raters/${id}`)
      .then(res => {
        // console.log('res.data', res.data);

        if (res.data.length === 0) {
          console.log('** Be the first to rate this quote! **');

          this.setState({
            showRatingBtn: true
          });
        } else {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].user_ip_address === usersIPAddress) {
              console.log('** You have rated this quote already! **');

              this.setState({
                showRatingBtn: false
              });
            } else {
              console.log('** You have not rated this quote! **');

              this.setState({
                showRatingBtn: true
              });
            }
          }
        }
      })
      .then(this.getQuoteAvgRating);
  }

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

      // console.log('Average Rating Math: ', averageRating);

      this.setState({
        quoteAverageRating: averageRating
      });
    } else {
      this.setState({
        quoteAverageRating: 0
      });
    }

    // console.log('Quote Average Rating: ', this.state.quoteAverageRating);
  }

  getSmallQuote() {
    axios
      .get('/api/smallQuote')
      .then(res => {
        // console.log('res.data', res.data);

        let randomQuoteID = Math.floor(Math.random() * res.data.length);
        // console.log('randomQuoteID: ', randomQuoteID);

        this.setState({
          currentQuote: res.data[randomQuoteID]
        });
        // console.log('randomQuote: ', this.state.currentQuote);
      })
      .then(this.getRaters);
  }

  getMediumQuote() {
    axios
      .get('/api/mediumQuote')
      .then(res => {
        // console.log('res.data', res.data);

        let randomQuoteID = Math.floor(Math.random() * res.data.length);
        // console.log('randomQuoteID: ', randomQuoteID);

        this.setState({
          currentQuote: res.data[randomQuoteID]
        });
        // console.log('randomQuote: ', this.state.currentQuote);
      })
      .then(this.getRaters);
  }

  getLargeQuote() {
    axios
      .get('/api/largeQuote')
      .then(res => {
        // console.log('res.data', res.data);

        let randomQuoteID = Math.floor(Math.random() * res.data.length);
        // console.log('randomQuoteID: ', randomQuoteID);

        this.setState({
          currentQuote: res.data[randomQuoteID]
        });
        // console.log('randomQuote: ', this.state.currentQuote);
      })
      .then(this.getRaters);
  }

  toggleQuoteModal() {
    this.setState({
      showQuoteModal: !this.state.showQuoteModal
    });
  }

  toggleRatingModal() {
    this.setState({
      showRatingModal: !this.state.showRatingModal
    });
  }

  rateCurrentQuote(event) {
    // console.log('event-name', event.target.name);
    const { name } = event.target;

    axios
      .put(`/api/rateQuote/${name}`, this.state)
      .then(res => {
        // console.log('res.data--rateCurrentQuote: ', res.data);

        this.setState({
          currentQuote: res.data[0]
        });
      })
      .then(this.getRaters);
  }

  render() {
    const {
      showQuoteModal,
      showRatingModal,
      showRatingBtn,
      currentQuote,
      quoteAverageRating
    } = this.state;

    return (
      <div className='App'>
        <div className={showQuoteModal ? 'showModal' : 'hideModal'}>
          <div className='modalBackdrop' onClick={this.toggleQuoteModal}>
            <div className='modalContainer'>
              <p className='modalTitle'>What Size Quote Would You Like?</p>
              <div className='modalBtnsContainer'>
                <div className='btnContainer'>
                  <p className='btnDescription'>
                    Small Quote: 4 Words or Less Long
                  </p>
                  <button className='quoteBtn' onClick={this.getSmallQuote}>
                    Small
                  </button>
                </div>
                <div className='btnContainer'>
                  <p className='btnDescription'>
                    Medium Quote: 5 - 12 Words Long
                  </p>
                  <button className='quoteBtn' onClick={this.getMediumQuote}>
                    Medium
                  </button>
                </div>
                <div className='btnContainer'>
                  <p className='btnDescription'>
                    Large Quote: 13 or More Words
                  </p>
                  <button className='quoteBtn' onClick={this.getLargeQuote}>
                    Large
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={showRatingModal ? 'showModal' : 'hideModal'}>
          <div className='modalBackdrop' onClick={this.toggleRatingModal}>
            <div className='modalContainer'>
              <p className='modalTitle'>Rate The Current Quote</p>
              <div className='ratingModalBtnsContainer'>
                <img
                  className='ratingModalBtn'
                  src={swansonSilhouette}
                  alt='Ron Swanson Silhouette'
                  name='oneStar'
                  onClick={this.rateCurrentQuote}
                />
                <img
                  className='ratingModalBtn'
                  src={swansonSilhouette}
                  alt='Ron Swanson Silhouette'
                  name='twoStars'
                  onClick={this.rateCurrentQuote}
                />
                <img
                  className='ratingModalBtn'
                  src={swansonSilhouette}
                  alt='Ron Swanson Silhouette'
                  name='threeStars'
                  onClick={this.rateCurrentQuote}
                />
                <img
                  className='ratingModalBtn'
                  src={swansonSilhouette}
                  alt='Ron Swanson Silhouette'
                  name='fourStars'
                  onClick={this.rateCurrentQuote}
                />
                <img
                  className='ratingModalBtn'
                  src={swansonSilhouette}
                  alt='Ron Swanson Silhouette'
                  name='fiveStars'
                  onClick={this.rateCurrentQuote}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='mainContents'>
          <div className='quoteBtnContainer'>
            <img
              className='quoteBtnPic'
              src={ronSwansonPic}
              alt='Ron Swanson'
              onClick={this.toggleQuoteModal}
            />
            <p className='quoteBtnTitle'>Click On Ron For A Quote</p>
          </div>
          <div
            className={
              currentQuote ? 'showQuoteContainer' : 'hideQuoteContainer'
            }
          >
            <p className='swansonQuote'>
              {currentQuote ? currentQuote.quote : null}
            </p>
            <div className='ratingContainer'>
              <p className='ratingTitle'>Average Rating:</p>
              <img
                className={quoteAverageRating >= 1 ? 'silhouette' : 'dot'}
                src={quoteAverageRating >= 1 ? swansonSilhouette : dot}
                alt={
                  quoteAverageRating >= 1
                    ? 'ron swanson silhouette'
                    : 'solid dot'
                }
              />
              <img
                className={quoteAverageRating >= 2 ? 'silhouette' : 'dot'}
                src={quoteAverageRating >= 2 ? swansonSilhouette : dot}
                alt={
                  quoteAverageRating >= 2
                    ? 'ron swanson silhouette'
                    : 'solid dot'
                }
              />
              <img
                className={quoteAverageRating >= 3 ? 'silhouette' : 'dot'}
                src={quoteAverageRating >= 3 ? swansonSilhouette : dot}
                alt={
                  quoteAverageRating >= 3
                    ? 'ron swanson silhouette'
                    : 'solid dot'
                }
              />
              <img
                className={quoteAverageRating >= 4 ? 'silhouette' : 'dot'}
                src={quoteAverageRating >= 4 ? swansonSilhouette : dot}
                alt={
                  quoteAverageRating >= 4
                    ? 'ron swanson silhouette'
                    : 'solid dot'
                }
              />
              <img
                className={quoteAverageRating >= 5 ? 'silhouette' : 'dot'}
                src={quoteAverageRating >= 5 ? swansonSilhouette : dot}
                alt={
                  quoteAverageRating >= 5
                    ? 'ron swanson silhouette'
                    : 'solid dot'
                }
              />
              <div className='ratingBtnContainer'>
                <div
                  className={showRatingBtn ? 'showRatingBtn' : 'hideRatingBtn'}
                >
                  <button
                    className='ratingBtn'
                    onClick={this.toggleRatingModal}
                  >
                    Rate Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
