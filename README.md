# Wordle-clone
This application is a clone of Wordle using HTML, CSS, and JavaScript.

Here is the website link. Play around with it: [Link to Website](https://wordle-clone-eddie.netlify.app/)

Demo video is shown [here](https://youtu.be/RwV05SrBHHI).



<strike> The application reads a dictionary of words from this endpoint: `https://api.masoudkf.com/v1/wordle`. The endpoint requires an API key
(`sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv`). The API is fetched using the following: </strike>


```js
    const res = await fetch("https://api.masoudkf.com/v1/wordle", {
        headers: {
        "x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",
        },
    });
    
  ```
##### Above code snippet is no longer used.

Because the professor took down the API, I created my own API using Java, Springboot and MySQL :)

<br>

---

# Update

I hosted the database on AWS and used Railway to host the API which handles the GET Requests.

The front-end is hosted on Netlify.

You don't need to run the program locally since I hosted it. However, the program can be run locally by referring to the next section.

---

# How to run the program locally
Ensure MySQL and Spring Boot is installed on your machine.

In order to run the program locally, clone the repo using `git clone "https://github.com/eddie-an/Wordle-clone"`

Change to wordle-api directory: `cd wordle-api`

Install MySQL Server and start the server

Run `mysql -u root -p` and enter your MySQL password

The command line interface should change to `mysql> `

Run `source Wordle.sql;` to set up the MySQL database

Run `quit` to exit out of the mysql command line interface

Run `brew install maven`

Then run `mvn spring-boot:run`

Server is now set up on localhost:8080

Change to wordle-application directory: `cd ../wordle-application`

Change `line 40` on [wordle.js](/wordle-application/wordle.js) to `http://localhost:8080/api/get-word`.

Then, the web application can be ran by clicking on `index.html`

---

# What I learned
* Front end web development
* JavaScript DOM API
* The use of `fetch` function to call an API endpoint.
* CSS styling
* HTML Document Object Model
* Creating an locally hosted API using Java and SpringBoot

---
# Gameplay

The full game play is shown [here](https://youtu.be/RwV05SrBHHI).

Keep scrolling for further explanations. 
<br>
The game instruction is shown when the user clicks on the `i` icon as shown below.
![How to play](how_to_play.png)

<br>

The game runs on the browser as shown below. The website fetches a random word from the API for the user to guess and the user gets 4 attempts.
The hint shows up on the bottom of the page when the user clicks on the `?` icon.
![gameplay](gameplay.png)

<br>

When the user guesses the word correctly, the win screen appears.
![win screen](win_screen.png)

<br>

There is a dark mode as well.
![dark mode](dark_mode.png)
