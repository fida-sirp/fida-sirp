import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/index';
import { getAssetTypeById } from '../../actions/assets';


import generalSaga from '../sagas/index';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware,createLogger()))
);

sagaMiddleware.run(generalSaga);

export default { store };
