# Wordle-clone
This application is a clone of Wordle using HTML, CSS, and JavaScript.
The application reads a dictionary of words from this endpoint: `https://api.masoudkf.com/v1/wordle`. The endpoint requires an API key
(`sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv`). The API is fetched using the following:

```js
    const res = await fetch("https://api.masoudkf.com/v1/wordle", {
        headers: {
        "x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",
        },
    });
  ```
  
<br>
Since the API endpoint contains only four letter words, this wordle clone has 4 letter words unlike the original wordle game which has 5.

