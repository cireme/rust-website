

/**
* Module dependencies.
*/
var ArticleDAL = require('../dal/articleDAL');
var logger      = require('../../configs/logger.js');

/**
* articleController class
*/
(function () {

    /**
    * Attributes.
    */
    var articleDAL = new ArticleDAL();

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
        app.get('/article', this.index);
        app.get('/article/show/:id', this.show);
        app.get('/article/new', this.new);
        app.post('/article/create', this.create);
        app.get('/article/edit/:id', this.edit);
        app.post('/article/edit', this.update);
        app.get('/article/delete/:id', this.delete);
        app.post('/article/delete', this.destroy);
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
            res.render('article/index', { 'articles': articles });
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
            res.render('article/show', { 'article': article });
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
                    res.redirect('/article');
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
            res.redirect('/article');
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
            res.redirect('/article');
        });
    };

    module.exports = ArticleController;
})();