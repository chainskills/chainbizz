import React, { useEffect, useState } from 'react';

import Rating from 'react-rating';

import { useKeyPress, useLockBodyScroll } from '../../../../hooks/Hooks';

import 'materialize-css/dist/css/materialize.min.css';
import '../Modal.css';

const AcceptModal = ({ dataID, onClose, action1, action2 }) => {
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
          <h4>Accept the delivery</h4>
          <p>
            If you accept the delivery, your deposit will be sent to the service
            provider.
          </p>
          <br />
          <p>
            Please review your collaboration with your fulfiller by providing a
            score between 1 to 5 (1: strongly disagree, 5: highly agree):
          </p>
          <div>
            <div className='row'>
              <div className='col s6'>My project was delivered on-time:</div>
              <div className='col s6'>
                <Rating
                  onChange={value => onChangeRating(0, value)}
                  initialRating={ratings[0]}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col s6'>My project was delivered on-budget:</div>
              <div className='col s6'>
                <Rating
                  onChange={value => onChangeRating(1, value)}
                  initialRating={ratings[1]}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col s6'>
                The fulfiller has the right hard-skills:
              </div>
              <div className='col s6'>
                <Rating
                  onChange={value => onChangeRating(2, value)}
                  initialRating={ratings[2]}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col s6'>
                The fulfiller has the right soft-skills:
              </div>
              <div className='col s6'>
                <Rating
                  onChange={value => onChangeRating(3, value)}
                  initialRating={ratings[3]}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col s6'>The quality have been meet:</div>
              <div className='col s6'>
                <Rating
                  onChange={value => onChangeRating(4, value)}
                  initialRating={ratings[4]}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col s6'>I will recommend this fulfiller:</div>
              <div className='col s6'>
                <Rating
                  onChange={value => onChangeRating(5, value)}
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

export default AcceptModal;