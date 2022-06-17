# PKSubbanTracker

[PKSubbanTracker.com](https://pksubbantracker.com)

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