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

These instructions assume you have a running Kibana + Elasticsearch developer instance.


- Download and uncompress latest APM Server: https://artifacts-api.elastic.co/v1/branches/master/builds/latest/projects/apm-server
- Edit `apm-server.yml` in the APM server directory
- Set `output.elasticsearch.hosts` to `["localhost:9200"]`
- Set `output.elasticsearch.username` to `"elastic"`
- Set `output.elasticsearch.password` to `"changeme"`
- In Kibana, click on the "+ Add integrations" button at the bottom of the left hand navigation
- Click on "Elastic APM"
- On step on, click on the "APM integration" button (in the middle of the screen, part of step 1)
- Click on "+ Add Elastic APM" (upper right hand side of the screen)
- Click "Save and Continue" (botton right hand corner of the screen)
- Click "Add Elastic Agent Later" on the modal
- In a sepearte terminal session, start APM server with `./apm-server -e`
- In a sepearte terminal session, clone `https://github.com/fkanout/elastic-apm-api-alerts-generator`
- `cd elastic-apm-api-alerts-generator`
- `npm install`
- `node index` 
- In a seperate terminal session, run `node scripts/run.js`
