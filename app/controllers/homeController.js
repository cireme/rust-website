/**
* homeController class
*/
var logger      = require('../../configs/logger.js');

(function () {

    /**
    * Constructor.
    * @param {app} - express app.
    */
    function HomeController(app) {
        this.routes(app);
    }

    /**
     * Controller routes
     * @param  {express} app
     */
    HomeController.prototype.routes = function(app) {
        app.get('/', this.index);
        app.get('/home', this.index);
        app.get('/home/index', this.index);
        app.get('/server', this.server);
        app.get('/mumble', this.mumble);
    };

    /**
     * [HttpGet].
     * index action
     * @param  {request} req
     * @param  {response} res
     */
    HomeController.prototype.index = function(req, res) {
        logger.LOG.info("Index Controller - Show Index Page");
        res.render('home/index');
    };

    /**
     * [HttpGet].
     * index action
     * @param  {request} req
     * @param  {response} res
     */
    HomeController.prototype.server = function(req, res) {
        logger.LOG.info("Index Controller - Show Server Page");
        res.render('home/server');
    };

    /**
     * [HttpGet].
     * index action
     * @param  {request} req
     * @param  {response} res
     */
    HomeController.prototype.mumble = function(req, res) {
        logger.LOG.info("Index Controller - Show Mumble");
        res.render('home/mumble');
    };

    module.exports = HomeController;
})();