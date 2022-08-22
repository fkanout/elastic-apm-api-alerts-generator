# elastic-apm-api-alerts-generator
This project will help generating alerts. It connects an APM agent of this tiny node app to the local ES with default credentials.


### What
This App has 4 routes:
- `/error` for `Error count threshold`
- `/slow` for `Latency threshold` (between [1000, 1000 + `SLOW_ROUTE_MS`[ ms) (to change the route latency check the `SLOW_ROUTE_MS` var)
- `/fail` for `Failed transaction rate threshold`
- `/success` for `Successful requests`
  `/flaky` for some successful requests and some error, change the `FLAKINESS_RATIO` for the error rate

### How
- clone `https://github.com/fkanout/elastic-apm-api-alerts-generator`
- cd `elastic-apm-api-alerts-generator`
- `npm install`
- `node index` 
- `curl http://localhost:3002/fail` || `curl http://localhost:3002/slow` || `curl http://localhost:3002/error` || `curl http://localhost:3002/flaky` || `curl http://localhost:3002/success`

You can also automatically generate some calls to the API endpoints using `node scripts/run.js`