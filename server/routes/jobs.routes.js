const jobRouter = require('express').Router();
const Job = require('../models/Job.model.js');

/**
 * Returns the id company, and link object keys by looping thrrough the data
 * @type {Array}
 */
jobRouter.get('/', function showJobData(req, res, next) {
    Job.find()
        .then(function returnJob(allJobs) {
            res.json(allJobs.map(function(job) {
                return {
                    id: job.id,
                    company: job.company,
                    link: job.link
                };
            }));
        })
        .catch(function handleError(err) {
            let ourError = new Error('Unable to retrieve jobs');
            ourError.status = 500;
            return next(ourError);
        });
});

/**
 * [err description]
 * @type {Error}
 */
jobRouter.get('/:id', function retrieveSingleJob(req, res, next) {
    console.log('req params', req.params);
    Job.findById(req.params.id)
        .then(function sendBackSingleJob(data) {
            if (!data) {
                let err = new Error('No job with that ID');
                err.status = 404;
                return next(err);
            }
            res.json({
                theJobIFound: data
            });
        })
        .catch(function handleIssues(err) {
            console.error(err);
            next(err);
        });
});


/**
 * Takes job data and pushs it to the allJobs array.
 * @param {Object}   req  Request argument
 * @param {Object}   res Response argument
 * @param {Function} next
 */
function addAJob(req, res, next) {
    console.log('incoming data for POST', req.body);
    let now = new Date();
    let theJobCreated = new Job({
        company: req.body.company,
        link: req.body.link,
        notes: req.body.notes,
        createTime: now
    });
    console.log(req.body.createTime);
    theJobCreated.save()
        .then(function returnResponse(data) {
            res.json(data);
        })
        .catch(function handleErrors(err) {
            let ourError = new Error('Incorrect data'); //needs something else
            err.status = 422;
            next(err);
        });

}


/**
 * [ourError description]
 * @type {Error}
 */
jobRouter.delete("/:id", function deleteAJob(req, res, next) {
    console.log('Job to delete', req.params.id);
    Job.deleteOne({
            "_id": req.params.id
        })
        .then(function returnResponse(data) {
            res.json(data);
        })
        .catch(function handleErrors(err) {
            let ourError = new Error('Data not found'); //needs something else
            err.status = 404;
            next(err);
        });
});

jobRouter.post('/', addAJob);
module.exports = jobRouter;
