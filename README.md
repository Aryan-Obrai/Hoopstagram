Hoopstagram: All Things NBA

![Logo](frontend/public/logo.png)

Description

Hoopstagram is a social media platform for basketball fans to unite and talk about all things NBA related. From debating the NBA playoffs to rating players and teams, Hoopstagram is the place to go to post about your NBA fandom and interact with other basketball fanatics.
Core Functionalities

    User Profiles: Users can create profiles and display their favorite team(s) and player(s) on their profile. Users will be able to update their profile info and view other profiles.

    Discussion Feed: This is the main page where users can post their latest thoughts on the NBA and interact with one another through comments and likes. Users will be able to filter posts based on teams.

    Games Page: A page where users can see recent games and viewer ratings. Users are able to rate the games out of 5 stars, and the average rating for each game will be displayed. Clicking on a game display will redirect to another page that shows the box score and comments for that game.

    Team/Players Page: Users will be able to view full roster details of NBA teams as well as player details.

Team Members

    Adeel Hussain
    Aryan Obrai
    Jeffrey Dominguez
    Calvin Truong

Project Plan

Front-end

For the front end of the project, we will be using React. Here are the tentative plans:

    User Profiles: Users will be able to create profiles with custom bios and profile pictures, all implemented in React.
    Discussion Feed: Allow users to create feeds where they can interact, post discussions, comment and like/dislike posts. Real-time updates of the feeds will be implemented using React.
    Games Page: Provide scores and game schedules using React. This will involve fetching data from the database.
    Team/Players: Create different pages for each player on the team and for each basketball team using React. The pages will allow searching and links to relevant feeds.

Back-end

For the back end, we will use Express for routes and MongoDB for our database, with Node.js. Here are the tentative plans:

    User Authentication: Use Express to implement user registration and login. MongoDB will be used to store user information securely.
    Real-Time Updating: Implement real-time updates for user feeds and discussions using SOCKET.io or similar functionalities.
    Database: Use MongoDB to store profiles, games, teams, discussions, etc.
