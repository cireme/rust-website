

/**
* Module dependencies.
*/

/**
* ArticleConverter class
*/
(function () {

    /**
    * add converted dates to Articles.
    * @param {articles} - model Articles
    */
    var addFormatedDates = function(articles) {

    	articles.forEach( function(entry) {
    		entry = addFormatedDate(entry);
    	});

    	return articles;
    }

    /**
    * add converted date to Article.
    * @param {article} - model Article
    */
    var addFormatedDate = function(article) {

    	console.log(article.createdAt.getMonth()+'/'+article.createdAt.getDate());
        var date = article.createdAt.getDate();
        if(date<10) {
            date = "0"+date;
        }

        var month = article.createdAt.getMonth()+1;
        if(month<10) {
            month = "0"+month;
        }

        article.date = date+"/"
            +month+" - "
            +article.createdAt.getHours()+":"
            +article.createdAt.getMinutes();

        return article;
    }

    /**
    * Export methods
    */

    module.exports.addFormatedDates = addFormatedDates;
    module.exports.addFormatedDate = addFormatedDate;
})();