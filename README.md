# Wordle Clone

- Go play the original Wordle [here](https://www.powerlanguage.co.uk/wordle/)
- Read the story behind it [here](https://www.nytimes.com/2022/01/03/technology/wordle-word-game-creator.html)
- Try this project [here](https://wordle.sk)
- Game code is based on the [open source clone of Wordle](https://github.com/hannahcode/wordle)

_Inspiration:_
This game is based on the immensely popular online word guessing game Wordle, but uses the Slovak dictionary and grammar. There are few more modifications to the game due to difference in Slovak alphabet and English one.

- Allows to retake the game if failed
- Allows to use any combination of the letters

There are plans to further extend the functionality with:

- Full dictionary to check words against (there is significant number of word variations possible)
- Hard mode which force you to reuse correctly guessed letters (same as in ordiginal)
- Statictics to compare against other players

I implemented Tailwind mostly because I wanted to learn how to use Tailwind CSS, but I also took advantage of [Tailwind UI](https://tailwindui.com/) with their [headless package](https://headlessui.dev/) to build the modals and notifications. This was such an easy way to build simple popups for how to play, winning the game, and invalid words.

_To Run Locally:_
Clone the repository and perform the following command line actions:

```bash
$ cd wordle
$ npm install
$ npm run start
```

open http://localhost:3000 in browser.
