import { setShowAlert } from "features/shareableLink/shareableLinkSlice";
import React from "react";
import { Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

/**
 * @typedef {Object} RootState
 * @property {Object} shareableLink
 * @property {string} shareableLink.link
 * @property {boolean} shareableLink.showAlert
 */
const AlertNotification = () => {
  const dispatch = useDispatch();
  const shareableLink = useSelector(
    /**
     * @param {RootState} state
     * @returns {string}
     */
    (state) => state.shareableLink.link
  );
  const showAlert = useSelector(
    /**
     * @param {RootState} state
     * @returns {boolean}
     */ (state) => state.shareableLink.showAlert
  );

  return (
    <>
      {showAlert && (
        <Alert
          variant="success"
          onClose={() => dispatch(setShowAlert(false))}
          dismissible
        >
          Shareable Link:{" "}
          <a href={shareableLink} target="_blank" rel="noopener noreferrer">
            {shareableLink}
          </a>
        </Alert>
      )}
    </>
  );
};

export default AlertNotification;
