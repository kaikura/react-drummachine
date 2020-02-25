This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## About the audio Engine (still work in progress)

Lets now install the tone library. Just type this in your terminal app of choice.
### `npm install  — save tone` 
Great. That’s all installation for tone.

Our TS lint is very rigid and doesn’t like modules that don’t have types, which sadly is the case of the Tone lib. In order to be able to use tone without our lint freaking out we’ll have to disable `noImplicitAny`
For that go to the tsconfig.json and change
`“noImplicitAny”: true,` to `“noImplicitAny”: false,`(if it's not there just add it!)
I would recommend doing the same for `noUnusedLocals` as I think it is a bit unnecessary. But feel free to choose.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## For the encoder

### `npm install express --save` 

### `npm install  socket.io socket.io-client --save` 

### `npm install  johnny-five --save` 

and use 

### 'node server.js' 
and 
### 'npm start' 
in order to run the server first and then our application
