# Wordle-clone
This application is a clone of Wordle using HTML, CSS, and JavaScript.

Demo is shown [here](https://youtu.be/RwV05SrBHHI).
Here is the website link. Play around with it: [Website Link](https://wordle-clone-eddie.netlify.app/)


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

Because the professor took down the API, I created my own using Java, Springboot and MySQL :)

<br>
Since the API endpoint contains only four letter words, this wordle clone has 4 letter words unlike the original wordle game which has 5.

---

# How to run the program
In order to run the program, clone the repo using `git clone "https://github.com/eddie-an/Wordle-clone"`

Change to wordle-api directory: `cd wordle-api`

Install MySQL Server and start the server

Run `mysql -u root -p` and enter your MySQL password

The command line interface should change to `mysql> `

Run `source Wordle.sql;` to set up the MySQL database

Run `quit` to exit out of the mysql command line interface

Run `brew install maven`

Then run `mvn spring-boot:run`

Server is now set up on localhost:8080

Change to wordle-application directory: `cd wordle-application`

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
