

/**
* Module dependencies.
*/
var ArticleDAL = require('../dal/articleDAL');
var ArticleConverter = require('../converters/articleConverter');
var MembershipFilters = require('../../middleware/membershipFilters');
var logger      = require('../../configs/logger.js');

/**
* articleController class
*/
(function () {

    /**
    * Attributes.
    */
    var articleDAL = new ArticleDAL();
    var filters = new MembershipFilters();

    /**
    * Constructor.
    * @param {app} - express app.
    */
    function ArticleController(app) {
        this.routes(app);
    }

    /**
    * articleController routes.
    * @param {app} - express app.
    */
    ArticleController.prototype.routes = function(app) {
        app.get('/articles', this.index);
        app.get('/account/articles', filters.authorize, this.indexConnected);
        app.get('/article/show/:id', this.show);
        app.get('/account/article/show/:id', this.showConnected);
        app.get('/article/new', filters.authorize, this.new);
        app.post('/article/create', filters.authorize, this.create);
        app.get('/article/edit/:id', filters.authorize, this.edit);
        app.post('/article/edit', filters.authorize, this.update);
        app.get('/article/delete/:id', filters.authorize, this.delete);
        app.post('/article/delete', filters.authorize, this.destroy);
    };

    /**
    * [httpget]
    * ArticleController index action.
    * @param {req} http request.
    * @param {res} http response.
    */
    ArticleController.prototype.index = function(req, res) {
        logger.LOG.info("Article Controller - Show All");
        articleDAL.getAll(function (articles) {
            articles = ArticleConverter.addFormatedDates(articles);

            res.render('article/index', { 'articles': articles });
        });
    };

    /**
    * [httpget]
    * ArticleController index action.
    * @param {req} http request.
    * @param {res} http response.
    */
    ArticleController.prototype.indexConnected = function(req, res) {
        logger.LOG.info("Article Controller - Connected Show All");
        articleDAL.getAll(function (articles) {
            articles = ArticleConverter.addFormatedDates(articles);

            res.render('article/indexConnected', { 'articles': articles });
        });
    };

    /**
    * [httpget]
    * ArticleController details action.
    * @param {req} http request.
    * @param {res} http response.
    */
    ArticleController.prototype.show = function(req, res) {
        var articleId = req.params.id;
        articleDAL.get(articleId, function (article) {
            articles = ArticleConverter.addFormatedDate(article);

            res.render('article/show', { 'article': article });
        });
    };

    /**
    * [httpget]
    * ArticleController details action.
    * @param {req} http request.
    * @param {res} http response.
    */
    ArticleController.prototype.showConnected = function(req, res) {
        var articleId = req.params.id;
        articleDAL.get(articleId, function (article) {
            articles = ArticleConverter.addFormatedDate(article);
            
            res.render('article/showConnected', { 'article': article });
        });
    };

    /**
    * [httpget]
    * ArticleController edit action.
    * @param {req} http request.
    * @param {res} http response.
    */
    ArticleController.prototype.edit = function(req, res) {
        var articleId = req.params.id;
        articleDAL.get(articleId, function (article) {
            articles = ArticleConverter.addFormatedDate(article);
            
            res.render('article/edit', { 'article': article });
        });
    };

    /**
    * [httppost]
    * ArticleController edit post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    ArticleController.prototype.update = function(req, res) {
        var article = req.body.article;
        
        articleDAL.get(article.id, function(entity){
            if(entity){
                articleDAL.update(entity, article, function (article) {
                    res.redirect('/account/articles');
                });
            }
            else{
                res.send(404);
            }
        });
    };    

    /**
    * [httpget]
    * articleController create action.
    * @param {req} http request.
    * @param {res} http response.
    */
    ArticleController.prototype.new = function(req, res) {
        res.render('article/create');  
    };

    /**
    * [httppost]
    * articleController create post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    ArticleController.prototype.create = function(req, res) {
        var article = req.body.article;        
        
        articleDAL.save(article, function (data) {
            res.redirect('/account/articles');
        });
    };

    /**
    * [httpget]
    * ArticleController delete action.
    * @param {req} http request.
    * @param {res} http response.
    */
    ArticleController.prototype.delete = function(req, res) {
        var articleId = req.params.id;
        articleDAL.get(articleId, function (article) {
            res.render('article/delete', { 'article': article });
        });
    };

    /**
    * [httppost]
    * ArticleController delete post action.
    * @param {req} http request.
    * @param {res} http response.
    */
    ArticleController.prototype.destroy = function(req, res) {
        var article = req.body.article;
        articleDAL.remove(article.id, function (data) {
            res.redirect('/account/articles');
        });
    };

    module.exports = ArticleController;
})();