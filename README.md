# An Introduction to Arthur
Arthur makes your meetings more effective than your competitors by introducing you to your client before you ever sit down together. What are the client's interests? What's the latest news from their organization? What does he or she look like? Arthur has the answers!

### How does it work?
Arthur uses Passport authentication to encrypt the user's password and stores the hash code in the MySQL database using the Sequelize model structure. Each user has a listing of clients with as much or as little data as the user would like to include. The more data included, the more accurate and thorough the briefing's result will be.

Arthur will search LinkedIn for the user's company information, the company's blurb, and the latest few posts the company has made on the network. Arthur will then find the user's profile information (including name, profile picture, and other available data) from Twitter's API, as well as the client's last few tweets. Finally, Arthur will search the New York Times' API for the latest headlines about the client's company.

Files are organized using the MVC stack. Our front-end designer chose to use custom CSS and standard HTML public files, as opposed to a templating engine. GET and POST routes are used to collect the necessary data; they require the user to be logged in & authenticated to access the API points.

### Who will use this?
Any size business or organization that meets with external or prospective clients will find Arthur invaluable; users will prove themselves to be ahead of the competition and can relate to the client on a more personal level, while having the latest insight on the client company's latest news.

### What is the goal?
The goal was to create and deploy a MySQL app on Heroku in a team environment and include functional unit testing. The timeline was 2 weeks, and the team included 3 members.

# Deployment
Deployment on a node server is required. After uploading the files, you will need to create your own MySQL database and updated the config/connection.js file with your database login credentials. Unfortunately, the LinkedIn API will only respond to "my-arthur.heroku.com" correctly, so an entirely new LinkedIn Development App will need to be created, and local server variables will need to be updated throughout the code. LinkedIn requires the callback URL to be defined as part of the application's setup.

# Screen Capture
![Screenshot](http://www.fullstacksteve.com/wp-content/uploads/2018/03/Arthur-Hero.png)

# Credits
Holly Zoba
* [Holly's GitHub Profile](https://github.com/boginis1)
* [Holly's LinkedIn Profile](https://www.linkedin.com/in/hollyzoba/)

Julian Sandersius
* [Julian's GitHub Profile](https://github.com/JSandersius)
* [Julian's LinkedIn Profile](https://www.linkedin.com/in/sonoa/)

Steve Marshall
* [Steve's Online Portfolio](http://fullstacksteve.com/)
* [Steve's GitHub Profile](https://github.com/SteveSonoa)
* [Steve's LinkedIn Profile](https://www.linkedin.com/in/sonoa/)