const jobRouter = require('express').Router();
const Job = require('../models/Job.model.js');

jobRouter.get('/', function showAllJobs(req, res, next){
  Job.find()
    .then(function sendBackAllJobs(allJobs){
      res.json(allJobs);
    })
    .catch(function handleIssues(err){
      console.error(err);
      let ourError = new Error('Unable to retrieve jobs.');
      ourError.status = 500;
      next(ourError);
    });
});

jobRouter.get('/find', function findMatchingJobs(req, res, next){
  Job.find({ company: {$regex: req.query.search, $options: 'i'} })
  .then(function sendBackMatchingJobs(allMatchingData){
    res.json(allMatchingData);
  })
  .catch(function handleIssues(err){
    console.error(err);
    next(err);
  });
});

jobRouter.get('/:jobid', function retrieveSingleJob(req, res, next){
  console.log('req params', req.params);

  Job.findById(req.params.jobid)
  .then(function sendBackSingleJob(theData){
    if (!theData){
      let err = new Error('No job with that ID');
      err.status = 404;
      return next(err);
    }
    res.json({ theJobIFound: theData });
  })
  .catch(function handleIssues(err){
    console.error(err);
    next(err);
  });
});

function addAJob(req, res, next){
  console.log('incoming data for POST', req.body);

  if (!req.body.job) {
    let err = new Error('You must provide a job');
    err.status = 400;
    next(err);
    return;
  }

  let theJobCreated = new Job({ company: req.body.job, });

  theJobCreated.save()
  .then(function sendBackTheResponse(data) {
    res.json({ message: "Job has been added!", theJobIAdded: data});
  })
  .catch(function handleIssues(err){
    console.err(err);
    let ourError = new Error('Unable to save job.');
    ourError.status = 500;
    next(ourError);
  });
}
jobRouter.post('/', addAJob);



module.exports = jobRouter;
