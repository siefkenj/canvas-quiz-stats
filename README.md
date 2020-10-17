# Canvas Quiz Stats
Canvas Quiz Stats is a Greasemonkey/Tampermonkey script to allow you to download all quiz questions as well
as all personalized versions of a specific quiz.

When you use randomized question groups on a Canvas quiz, Canvas will let you inspect an individual's quiz
(and the unique order that they were presented questions in), but it will now let you batch-download
all quizzes for all students. This script adds a *Quiz Stats* button that allows access to this data.

# Installation

In Firefox or Chrome, install [Greasemonkey](https://addons.mozilla.org/en-CA/firefox/addon/greasemonkey/) or Tampermonkey.
You can then install the script by clicking [here](https://github.com/siefkenj/canvas-quiz-stats/raw/main/dist/react-userscripts.user.js).

# Development

## Building

To build `canvas-quiz-stats` you must have [Node.js](https://nodejs.org/en/download/) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
Then, from the `canvas-quiz-stats` directory, run

```
cd userscript/
npm install
npm run build
```

When the build script completes, you should have a fresh version of the userscript located at `dist/react-userscripts.user.js`
(in the top-level `dist/` directory). (Ignore the message provided on the console about serving the project; that message is for
developing a normal web application, not a userscript addon.)

## Development and Dynamic Loading

When developing, it's nice to be able to get the newest version of your script upon a page
refresh. To do this, install the development version of `react-userscripts` script located
`dist/react-userscripts-dev.user.js` or click [here](https://github.com/siefkenj/canvas-quiz-stats/raw/main/dist/react-userscripts-dev.user.js).
The dev script will dynamically load the extension from port `8124`, so you can take advantage of
`create-react-app`'s ability to auto-recompile an app when the source changes.

Now, run

```
cd userscript/
npm install    # if you haven't already
npm start
```

and a development server should start running on `localhost:8124`. Changing any files in `userscript/src` will trigger
and automatic recompile which will be served to the dev addon on the next page reload.
