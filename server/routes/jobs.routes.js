const jobRouter = require('express').Router();
const Job = require('../models/Job.model.js');


/**
 * Gets a all the object data  stored in the server.
 * @param {Object}   req  Request argument
 * @param {Object}   res  Response argument
 * @param {Function} next
 */
jobRouter.get('/', function showJobData(req, res, next) {
    Job.find()
        /**
         *  Takes in an object data from allJobs and maps it to job
         * @param  {Object}
         * @return {Object}
         */
        .then(function returnJob(allJobs) {
            res.json(allJobs.map(function(job) {
                return {
                    id: job.id,
                    company: job.company,
                    link: job.link
                };
            }));
        })
        /**
         *  Takes the err logs it. Moves to the error handler middleware.
         * an error.
         * @param {Error} err
         *@return {Function}   goes to the error handler
         */
        .catch(function handleError(err) {
            let ourError = new Error('Unable to retrieve jobs');
            ourError.status = 500;
            return next(ourError);
        });
});


/**
 * Gets a single object by id
 * @param {Object}   req  Request argument
 * @param {Object}   res  Response argument
 * @param {Function} next
 */
jobRouter.get('/:id', function retrieveSingleJob(req, res, next) {
    console.log('req params', req.params);
    Job.findById(req.params.id)
        /**
         *  Takes in an object and checks the id. If the id doesnt match, it return
         * an error.
         * @param {Object}
         * @return {Promise}   Moves on with next(err) if !data otherwise returns the
         *                     returns the job data.
         */
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
        /**
         *  Takes the err logs it. Moves to the error handler middleware.
         * an error.
         * @param {Error} err   Goes to the error handler
         */
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
        /**
         *  Takes in a data object and responds by putting it into json as a
         *  promise
         * @param  {Object}
         * @return {Promise}   Moves on with next(err) if !data otherwise returns the
         *                     returns the job data.
         */
        .then(function returnResponse(data) {
            res.json(data);
        })
        /**
         *  Takes the err sets the status to 422.  Moves to the error handler middleware.
         *  an error.
         * @param {Error} err   Goes to the error handler
         */
        .catch(function handleErrors(err) {
            let ourError = new Error('Incorrect data');
            err.status = 422;
            next(err);
        });
}


/**
 * Calls the delete middleware and passes the req and res objects. Takes the next
 * takes the next function.
 * @param {Object}   req  Request argument
 * @param {Object}   res  Response argument
 * @param {Function} next
 */
jobRouter.delete("/:id", function deleteAJob(req, res, next) {
    console.log('Job to delete', req.params.id);
    Job.deleteOne({
            "_id": req.params.id
        })
        /**
         *  Takes in a data object and responds by putting it into json as a
         *  promise
         * @param  {Object}
         * @return {Promise}   Moves on with next(err) if !data otherwise returns the
         *                     returns the job data.
         */
        .then(function returnResponse(data) {
            res.json(data);
        })
        /**
         *  Takes the err sets the status to 404.  Moves to the error handler middleware.
         *  an error.
         * @param {Error} err   Goes to the error handler
         */
        .catch(function handleErrors(err) {
            let ourError = new Error('Data not found'); //needs something else
            err.status = 404;
            next(err);
        });
});


jobRouter.post('/', addAJob);
module.exports = jobRouter;
