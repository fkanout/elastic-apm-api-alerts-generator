# elastic-apm-api-alerts-generator
This project will help generating alerts. It connects an APM agent of this tiny node app to the local ES with default credentials.


### What
This App has 3 routes:
- `/error` for `Error count threshold`
- `/slow` for `Latency threshold` (to change the route latency check the `SLOW_ROUTE_MS` var)
- `/fail` for `Failed transaction rate threshold`

### How
- clone `https://github.com/fkanout/elastic-apm-api-alerts-generator`
- cd `elastic-apm-api-alerts-generator`
- `npm install`
- `node index` 
- `curl http://localhost:3002/fail` || `curl http://localhost:3002/slow` || `curl http://localhost:3002/error`



