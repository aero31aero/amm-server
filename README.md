# crux-node

Repository for website and forum for Crux.

## Roadmap

1. Research existing forum solutions.
2. Research existing blogging solutions.
3. Deploy them together.
4. Add custom UI elements and do theming.
5. Implement central login using passport.js
6. Test.

## Proposed Technologies

1. backend: nodejs
2. frontend: angular
3. database: mongodb/redis

## Working method

Please follow the following branching conventions to the best possible.

1. `master` branch will contain the stable version.
2. `rolling` branch will contain the current version.
3. Use `git checkout -b feature-name` to branch from `rolling`. When done, merge back to `rolling`.
4. Only when the whole project is stable, do we merge `rolling` with `master` and push out to heroku/firebase/any other deployment platform.

## Contribute

### Backend

Use the following commands to prepare the development environment on a Linux system and run the code. Windows developers, do your equivalent.

```
git clone https://github.com/CRUx-BPHC/crux-node.git
cd crux-node
git checkout rolling
sudo npm install
npm start
```

The last command will start the server. To stop, press `CTRL+C`. Further documentation will be added to the docs/ directory.

### Frontend

Repeat the steps for Backend for now. Any changes will be updated here.

## Contributors

1. [Rohitt Vashishtha](https://github.com/aero31aero)
2. [Nischay Pro](https://github.com/Nischay-Pro)
3. [Abhilash Verma](https://github.com/rogeredthat)
