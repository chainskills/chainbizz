import React, { useEffect } from 'react';

import { useKeyPress, useLockBodyScroll } from '../../../../hooks/Hooks';

import 'materialize-css/dist/css/materialize.min.css';
import '../Modal.css';
import RatingsIssuerModal from './RatingsIssuerModal'
import RatingsFulfillerModal from './RatingsFulfillerModal';

const RatingsModal = ({ dataID, onClose, action1, action2, ratingsIssuer }) => {
  const escPress = useKeyPress('Escape');


  useEffect(() => {
    if (escPress) {
      onClose();
    }
    // eslint-disable-next-line
  }, [escPress]);

  // Hook to lock scrolling
  useLockBodyScroll();

  return (
    <div>
      {ratingsIssuer === true && 
        <RatingsIssuerModal 
        dataID={dataID}
        onClose={onClose}
        action1={action1}
        action2={action2} />
      }
      
      {ratingsIssuer === false && 
        <RatingsFulfillerModal 
        dataID={dataID}
        onClose={onClose}
        action1={action1}
        action2={action2} />
      }

    </div>
  );
};

export default RatingsModal;
