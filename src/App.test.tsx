import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Error from "./Error/Error"
import CandidatesGrid from "./CandidatesGrid/CandidatesGrid";
import Loader from "./Loader/Loader"

/* FUTURE IMPROVEMENTS: - Some of the very basic test cases has been written below. More test cases will be written later on */
test('App: renders App correctly', () => {
  render(<App />);
  const pageHeading = screen.getByText(/Candidates Dashboard/i);
  expect(pageHeading).toBeInTheDocument();
});

test('CandidatesGrid: Render CandidatesGrid correctly', () => {
  render(<CandidatesGrid  candidatesDetails={[]} error={false} filterBy={{"name": "Shantanu"}} setFilterBy={() => {}} loading={true} setSortBy={() => {}} setSortDirection={() => {}}/>);
  const componentHeading = screen.getByText(/Applications/i);
  expect(componentHeading).toBeInTheDocument();
});

test('Error: Error image is present in document', () => {
  render(<Error />);
  const errorImage = screen.getByAltText('error');
  expect(errorImage).toBeInTheDocument();
});

test('Loader: Loader contains text with className', () => {
  render(<Loader />);
  const generalIntentEle = screen.getByText('We\'re testing your patience!');
  expect(generalIntentEle.classList.contains('loader-text')).toBe(true);
});