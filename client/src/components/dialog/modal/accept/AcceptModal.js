import React, { useEffect } from 'react';

import Rating from 'react-rating';

import { useKeyPress, useLockBodyScroll } from '../../../../hooks/Hooks';

import 'materialize-css/dist/css/materialize.min.css';
import '../Modal.css';

const AcceptModal = ({ dataID, onClose, action1, action2 }) => {
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
    <div className='modalEx-overlay'>
      <div className='modalEx'>
        <div className='modal-content'>
          <h4>Accept the delivery</h4>
          <p>
            If you accept the delivery, your deposit will be sent to the service
            provider.
          </p>
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
              onClick={() => action1.handle(dataID)}
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
