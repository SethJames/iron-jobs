const jobRouter = require('express').Router();
const Job = require('../models/Job.model.js');
/**
 * Returns thr id company, and link object keys by looping thrrough the data
 * @type {Array}
 */
jobRouter.get('/', function showJobData(req, res, next) {
    Job.find()
        .then(function returnJob(allJobs) {
            res.json(allJobs);
        })
        .catch(function handleError(err) {
            let ourError = new Error('Unable to retrieve jobs');
            ourError.status = 500;
            next(ourError);
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




jobRouter.delete("/:_id", function deleteAJob(req, res, next) {
    console.log('Job to delete', req.ObjectId);
    Job.deleteOne({
            "/:_id": req.params.id
        })
        .then(function returnResponse(data) {
            res.json(data);
            return deleteAJob();
        })
        .catch(function handleErrors(err) {
            let ourError = new Error('Data not found'); //needs something else
            err.status = 404;
            next(err);
        });
});






jobRouter.post('/', addAJob);

module.exports = jobRouter;
