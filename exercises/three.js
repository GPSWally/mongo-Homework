module.exports = function(mongoose, Checkout, Movie) {
	//What is the title of the movie(s) that was the most checked out?



	Checkout.aggregate( 
		{$group: {_id: {MovieID: "$movieId"}, total:{$sum: 1}}},
	 	{$sort: { "total": -1}}, 
		function (err, mResult){
			if (err){
				console.log('error reading database');
			} else{
				var tResult = JSON.stringify(mResult[0]._id).substr(11,3);
				Movie.findOne({ _id: tResult }, function (err, xResult){
					if (err){
						console.log ('error reading the database');
					} else { 
						console.log ("Most checked out movie in the last 12 months was '" +
							xResult.title + "', it was checked out " + mResult[0].total + " times.");
					}
				});
			}	
		}
	);
};
