import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
// function* showPreloader() {
//   yield put({type: SHOW_PRELOADER, visibility: true})
// }
// function* hidePreloader() {
//   yield put({type: HIDE_PRELOADER, visibility: false})
// }
// function* showFoundCountries(foundCountries) {
//   yield put({type: SHOW_FOUND_COUNTRIES, data: foundCountries})
// }
// function* showAllCountries(allCountries) {
//   yield put({type: SHOW_ALL_COUNTRIES, data: allCountries})
// }
// function* hideCities() {
//   yield put({type: HIDE_CITIES, data: []})
// }
// function* getAccess(userAccess) {
//   yield put({type:GET_ACCESS, access: userAccess}) 
// }
// function* cancelAccess() {
//   yield put({type:CANCEL_ACCESS, access: false})
// }
// function* createAccount() {
//   yield put({type:CREATE_ACCOUNT, status: true})
// }
// function* cancelStatus() {
//   yield put({type:CANCEL_STATUS, status: false})
// }