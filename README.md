# Reactionary

[Link to the Site!](https://startup.reactionary.click/)

[My Notes](notes.md)

Reactionary is a simple reaction-testing game that allows users to test their reaction times and compare them with the average reaction time and compare them with the reaction times of others. It will take three tests and then average out the results.

There are many factors to reaction time, and the hope is to help others recognize how those factors affect their reaction time by showing them different situations that impact them.

## 🚀 Specification Deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Test how fast you are! Find your reaction time and see how you compare to others. Prove to your friends that your reaction time is better than others. However, this isn't just your ordinary reaction test. This tests users in all kinds of situations, sometimes random locations or random pictures so that user can know how they fare under different circumstances.

### Design

![Design image](Site.png)

Rough design as to how server functionality will work.
```mermaid
sequenceDiagram
    actor User
    participant Website
    User->>Website: Click
    participant Server
    Website->>Server: Click times
    User->>Server:Login Info
    Server->>Website:User Scores
```

### Key features

- Secure login using HTTPS
- Button that must be clicked on
- Timer
- Randomized times between button presses
- Totals from all users in real time
- Scoreboard
- Results are permanently stored

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Two HTML pages. One for login and the other for button test and scoring.
- **CSS** - Styling that uses color contrast for button and leaderboard. Different formatting for different screen sizes.
- **React** - Login functionality, Button functionality, and displaying scoreboard.
- **Service** - Backend with endpoints for 
    -  submitting scores 
    -  login 
    -  recieving scores
    -  retrieving user data
    -  Calls to (https://random-d.uk/api) for randomized reaction images.
- **DB/Login** - Stores login users and scores. Users who are not registered or logged in cannot have their scores posted.
- **WebSocket** - Scores are updated and shown to all users.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://reactionary.click/).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - I have three pages, an about page `about.html`, the game page `game.html`, and the login page `index.html`.
- [x] **Proper HTML element usage** - I used several html elements and learned about a few like table and link. I also learned a bit about how svg works and how to organize html pages a bit better.
- [x] **Links** - Each page links to the other pages
- [x] **Text** - Every page has headers and the about me page has text describing the game.
- [x] **3rd party API placeholder** - Placeholder ducks for distraction. Will call random duck for 3rd party. Also 3rd party placeholder for chart creation.
- [x] **Images** - Two placeholder ducks.
- [x] **Login placeholder** - Placeholder login in `index.html`
- [x] **DB data placeholder** - Placeholder table for high scores.
- [x] **WebSocket placeholder** - Notification placeholder for player input.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Visually appealing colors and layout. No overflowing elements.** - I made stripe details and nice coloring for text objects. None of the pages overflow.
- [x] **Use of a CSS framework** - I used bootstrap for the header navbar and checkbox for "duck mode".
- [x] **All visual elements styled using CSS** - Every html element has some form of CSS applied to it.
- [x] **Responsive to window resizing using flexbox and/or grid display** - All elements use either flex or grid depending upon where they are supposed to be on the page.
- [x] **Use of a imported font** - I used the typewriter font for the about page.
- [x] **Use of different types of selectors including element, class, ID, and pseudo selectors** - I used ID for the stats title and I used classes to represent different parts of the play area and the about-me page. I used selectors for the navbar and header.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Bundled using Vite** - I installed and used Vite.
- [x] **Components** - I have 3 jsx components, one for every page.
- [x] **Router** - The navbar routes to every page possible and routes to a does not exist page if a user puts in an invalid path.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **All functionality implemented or mocked out** - Took me ages but I finally did it! Everything works now.
- [x] **Hooks** - There are hooks everywhere. Everything that is a variable is a hook.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Node.js/Express HTTP service** - Installed express using npm. Uses port 4000.
- [x] **Static middleware for frontend** - endpoints in service
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [x] **Backend service endpoints** - endpoints for auth and scores. The scores endpoint has a bit of middleware to update 4 different systems at once.
- [x] **Frontend calls service endpoints** - Frontend calls for scores on button click and on game open. Frontend calls for authorization on page open and login.
- [x] **Supports registration, login, logout, and restricted endpoint** - Scores are restricted and game page is inaccessible without authentication.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
