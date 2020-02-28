import React, { useEffect, useState } from 'react';

import Rating from 'react-rating';

import { useKeyPress, useLockBodyScroll } from '../../../../hooks/Hooks';

import 'materialize-css/dist/css/materialize.min.css';
import '../Modal.css';
import starempty from '../../../../assets/images/starempty.png';
import starfull from '../../../../assets/images/starfull.png';

const RatingsIssuerModal = ({ dataID, onClose, action1, action2 }) => {
  const escPress = useKeyPress('Escape');

  const [ratings, setRatings] = useState([3, 3, 3, 3, 3, 3]);

  useEffect(() => {
    if (escPress) {
      onClose();
    }
    // eslint-disable-next-line
  }, [escPress]);

  const onChangeRating = (position, rating) => {
    let newRatings = [...ratings];
    newRatings[position] = rating;
    setRatings(newRatings);
  };

  // Hook to lock scrolling
  useLockBodyScroll();

  return (
    <div className='modalEx-overlay'>
      <div className='modalEx'>
        <div className='modal-content'>
          <h4>Set ratings to the issuer</h4>
          <p>
            Please review your collaboration with your issuer by providing a
            score between 1 to 5 (1: strongly disagree, 5: highly agree):
          </p>
          <div>
            <div className='row'>
              <div className='col s6'>The requests were clearly described and precise:</div>
              <div className='col s6'>
                <Rating
                  emptySymbol={
                    <img src={starempty} className='icon ratingsIcon' />
                  }
                  fullSymbol={
                    <img src={starfull} className='icon ratingsIcon' />
                  }
                  onChange={value => onChangeRating(0, value)}
                  initialRating={ratings[0]}
                />
              </div>
            </div>
            
            <div className='row'>
              <div className='col s6'>
                The issuer has the right soft-skills:
              </div>
              <div className='col s6'>
                <Rating
                  emptySymbol={
                    <img src={starempty} className='icon ratingsIcon' />
                  }
                  fullSymbol={
                    <img src={starfull} className='icon ratingsIcon' />
                  }
                  onChange={value => onChangeRating(1, value)}
                  initialRating={ratings[3]}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col s6'>The requests and the communication with the issuer were serious:</div>
              <div className='col s6'>
                <Rating
                  emptySymbol={
                    <img src={starempty} className='icon ratingsIcon' />
                  }
                  fullSymbol={
                    <img src={starfull} className='icon ratingsIcon' />
                  }
                  onChange={value => onChangeRating(2, value)}
                  initialRating={ratings[4]}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col s6'>I will recommend this issuer:</div>
              <div className='col s6'>
                <Rating
                  emptySymbol={
                    <img src={starempty} className='icon ratingsIcon' />
                  }
                  fullSymbol={
                    <img src={starfull} className='icon ratingsIcon' />
                  }
                  onChange={value => onChangeRating(3, value)}
                  initialRating={ratings[5]}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='modal-footer'>
          {action2.visible && (
            <a
              href={null}
              className='waves-effect waves-blue btn-flat'
              onClick={() => action2.handle()}
            >
              {action2.title}
            </a>
          )}
          {action1.visible && (
            <a
              href={null}
              className='waves-effect waves-blue btn-flat'
              onClick={() => action1.handle(dataID, ratings)}
            >
              {action1.title}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default RatingsIssuerModal;
