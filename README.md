# Candidates Dashboard for HRMS.

## Background
Simple dashboard displaying list of potential candidates fit for hiring process, which allows sorting and searching of 
candidates information.

## Below fields are displayed

Name (string)

Email (string)

Age (string - birthday)

Years of experience (number)

Position applied (string)

Date of application (string)

Status of the application (string: approved | rejected |waiting)

## Sortable fields
Position applied (string)

Years of experience (number)

Date of application (string)

## Searchable fields
Name (string)

Status of the application (string: approved | rejected |waiting)

Position applied (string)

## Key points
- Typescript has been used with React, to make the application strictly types and less error prone. Props and state values can be checked for type and errors can be found at early stages.
- No UI library has been used and code is written mainly using plain HTML. As future enhancements 
CSS in JS can be be used for styling purpose which is very well supported by Material UI or any other UI library.
- The app can be enhanced even further and the candidates for the same are part of code as comments. Searching **FUTURE IMPROVEMENTS:** in the repo will list down places where enhancements can be done in future.
- The web page is hosted @https://candidates-dashboard.netlify.app/
- Redux has not been used in the app. Given the amount of data does not cater the need to use Redux. Redux might have been a good choice 
during the overall application development where sharing of state across components is required.
- The app is best optimized for Desktop View, as a future enhancement UI can be developed for Mobile as well.
- The test cases written are very basic and more will be added in future.
- Below is the lighthouse report.

<img src="https://i.ibb.co/W0Wm8d4/Screenshot-2022-10-10-at-6-36-04-PM.png" alt="Screenshot-2022-10-10-at-6-36-04-PM" border="0"> 

## Setting up and running locally

- Clone the  [repository](https://github.com/shantanutomar/candidate-dashboard.git).
- Run `npm install` in the root directory.
- Run `npm start`.
- Hit the URL - http://localhost:3000