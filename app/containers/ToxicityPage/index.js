/**
 *
 * ToxicityPage
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import * as _ from 'lodash';
import { Grid, Button, Typography, TextField, CircularProgress } from '@material-ui/core';
import * as toxicity from '@tensorflow-models/toxicity';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import makeSelectToxicityPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function ToxicityPage() {
  useInjectReducer({ key: 'toxicityPage', reducer });
  useInjectSaga({ key: 'toxicityPage', saga });

  const [input, setInput] = useState('');
  const [computing, setComputeState] = useState(false);
  const [predictions, setPredictions] = useState([]);

  const handleClick = () => {
    setComputeState(true);
    // The minimum prediction confidence.
    const threshold = 0.9;
    toxicity.load(threshold).then(model => {
      const sentences = [input];

      model.classify(sentences).then(pres => {
        setPredictions(pres);
        setComputeState(false);
      });
    });
  };

  const handleInput = e => {
    setInput(e.target.value);
  };

  return (
    <Grid style={{ padding: 8 }}>
      <Grid container>
        <TextField
          id="standard-basic"
          label="Sentence"
          value={input}
          onChange={handleInput}
          style={{ minWidth: 500 }}
        />
      </Grid>
      {computing && <CircularProgress color="primary" />}
      {!computing && (
        <Button onClick={handleClick} style={{ cursor: 'pointer' }}>
          get Toxicity
        </Button>
      )}
      {!computing &&
        !_.isEmpty(predictions) &&
        _.map(predictions, (prediction, pointer) => (
          <Grid container key={pointer}>
            <Grid item>
              <Typography variant="body1" color="primary">
                {prediction.label}
              </Typography>
            </Grid>
            <Grid item>
              {(prediction.results[0].match === true || prediction.results[0].match === null) && (
                <Typography variant="body1" color="primary">
                  <DoneIcon />
                </Typography>
              )}
              {prediction.results[0].match === false && (
                <Typography variant="body1" color="secondary">
                  <ClearIcon />
                </Typography>
              )}
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
}

ToxicityPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  toxicityPage: makeSelectToxicityPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ToxicityPage);
