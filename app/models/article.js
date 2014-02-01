module.exports = function (db, DataTypes) {

	var article = db.define('article', {
		
			
				title: DataTypes.STRING,
			
				text: DataTypes.TEXT,

				createdAt: DataTypes.DATE
			
		
	});
	return article;
}