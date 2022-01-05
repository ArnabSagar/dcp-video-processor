const SCHEDULER_URL = new URL('https://scheduler.distributed.computer');


async function main() {

    // await init('https://scheduler.distributed.computer');

    const compute = require('dcp/compute');
  
    // Data and work function
    const data = [1, 53, 2, 12];
    function workFunction(datum) {
      // Return the square of the number passed in
      progress();
      return datum * datum;
    }
  
    // Create and execute the job
    const job = compute.for(data, workFunction);
    job.on('result', function (ev) {
        console.log(ev.result);
      });

    job.on('status', () => {
        console.log('job.status', job.status);
    });
    
    job.public.name = 'Arnab example, nodejs';
    const results = await job.localExec();
    //const results = await job.exec(compute.marketValue);
    // const results = await job.exec(0.0001);
    
    console.log(Array.from(results));

  }

/* Initialize DCP Client and run main() */
require('dcp-client')
  .init(SCHEDULER_URL)
  .then(main)
  .catch(console.error)
  .finally(process.exit);