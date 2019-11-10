# Rolls Co - Gestor

## Dependencies
- Node.js: https://nodejs.org
- Firebase: https://firebase.google.com

## Installation
- `npm install`

## Development
- `npm start`

## Deployment
Additional info: https://create-react-app.dev/docs/deployment

- `node src/services/compress-images/products.js`
- `npm run build`
- `firebase init`
- `firebase deploy`

IMPORTANT: set proper HTTP caching headers for service-worker.js file in firebase.json file (issue #2440). It should be added inside "hosting" key like next:

ALSO: set caching headers for image caching, 7 days
```json
{
  "hosting": {
    "headers": [
      {
        "source": "/service-worker.js", 
        "headers": [{"key": "Cache-Control", "value": "no-cache"}]
      },
      {
        "source": "**/*.@(jpg|jpeg|gif|png)",
        "headers": [ {
          "key": "Cache-Control",
          "value": "max-age=604800"
        } ]
      }
    ]
  }
}
    ...
```



- Staging project: `firebase deploy -P pedidos-staging`
- PRODUCTION project: `firebase deploy` ⚠️