module.exports = function (db, DataTypes) {

	var article = db.define('article', {
		
			
				title: DataTypes.STRING,
			
				text: DataTypes.TEXT,
			
		
	});
	return article;
}