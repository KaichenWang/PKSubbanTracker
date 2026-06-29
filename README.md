# PKSubbanTracker

[PKSubbanTracker.com](https://pksubbantracker.com)

## Development

Install dependencies
```
npm install
```

Start the local dev server
```
npm start
```

Opens [http://localhost:3000](http://localhost:3000) in the browser.

## Deploy

Ensure latest changes are on `main` branch
```
git checkout main
```

Update build
```
npm run build
```

Deploy to `gh-pages` branch
```
git push origin `git subtree split --prefix build main`:gh-pages --force
```