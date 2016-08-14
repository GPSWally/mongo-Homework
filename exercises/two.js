module.exports = function(mongoose, Checkout, Movie) {
	// Which users checked out any of the Lord of the Rings trilogy?

	Movie.aggregate( { $match: { title: /The Lord of the Rings:.*/ } }, function(err, mResult){
		//console.log(mResult[0]._id, mResult[1]._id, mResult[2]._id );
		//var myRExp = "/" + mResult[0]._id + "|" + mResult[1]._id + "|" + mResult[2]._id + "/";
		//The RegExp is correct but for some reason will not work, so I didn't use it.
		// I tried converting it to a number an a string but it nothing worked.
		//console.log ('myRExp ' + myRExp); // This works
		//console.log ("myRExp is type " + typeof(myRExp));

		// Checkout.aggregate( // DON'T USE -- only looks at the first 2,
		// 		{$match: {$or: [{movieId: mResult[2]._id}, 
		// 			{movieId: mResult[1]._id}, 
		// 			{movidId: mResult[0]._id}]}}, 
		// 		{$group: {_id: {UserID: "$userId"}, total:{$sum: "$movieId"}}},
		// 	 	{$sort: { "total": -1}}, 
		// 		function (err, result){
		// 			var tResult = JSON.stringify(result);
		// 			console.log(); 		
		// 			console.log("Users that watched a Lord of the Rings Movie TOTAL OR " +
		// 			tResult);
		// 		}
		// 	);
//$match : { 'author' : { $in: ['dave','john'] }

		Checkout.aggregate( 
				{$match: {'movieId': { $in: [mResult[2]._id, mResult[1]._id, mResult[0]._id]}}}, 
				{$group: {_id: {UiD: "$userId"}, total:{$sum: "$movieId"}}},
			 	{$sort: { "total": -1}}, 
				function (err, result){
					if (err) {
						console.log(err);
					} else {
						var idArr = [];
						var sumArr = [];
						var X;
						console.log();
						console.log("A list of users who watched one of the Lord of the Rings in the last year.");
						for (var i in result){
							if (JSON.stringify(result[i]._id).substr(8) === '}'){
								X = 1;
							} else {
								X = 2;
							}
							idArr.push(JSON.stringify(result[i]._id).substr(7, X));
							sumArr.push(JSON.stringify(result[i].total));
							console.log ("Viewer ID of "+ 
								JSON.stringify(result[i]._id).substr(7, X) + 
								" watched " + JSON.stringify(result[i].total) + " LOR movies in the last 12 months");
						}
						//console.log('idArr = ' + idArr);
						//console.log('sumArr = ' + sumArr);
						var tResult = JSON.stringify(result);
						console.log();
						// console.log("Users that watched a Lord of the Rings Movie TOTAL IN " +
						// tResult);
					}
				}
			);



	// 	Checkout.aggregate( 
	// 		{$match: {movieId: mResult[0]._id} },
	// 		{$group: {_id: {UserID: "$userId"}, total:{$sum: "$movieId"}}},
	// 		{$sort: { "total": -1}}, 
	// 		function (err, result){
	// 			var aResult = JSON.stringify(result);
	// 			console.log();
	// 			console.log("Users that watched a Lord of the Rings Movie #1 " +
	// 				aResult);
	// 		}
	// 	);




	// 	Checkout.aggregate( 
	// 		{$match: {movieId: mResult[1]._id} },
	// 		{$group: {_id: {UserID: "$userId"}, total:{$sum: "$movieId"}}},
	// 		{$sort: { "total": -1}}, 
	// 		function (err, result){
	// 			var bResult = JSON.stringify(result);
	// 			console.log();
	// 			console.log("Users that watched a Lord of the Rings Movie #2 " +
	// 				bResult);
	// 		}
	// 	);



	// 		Checkout.aggregate( 
	// 		{$match: {movieId: mResult[2]._id} },
	// 		{$group: {_id: {UserID: "$userId"}, total:{$sum: "$movieId"}}},
	// 		{$sort: { "total": -1}}, 
	// 		function (err, result){
	// 			var cResult = JSON.stringify(result);
	// 			console.log();
	// 			console.log("Users that watched a Lord of the Rings Movie #3 " +
	// 				cResult);
	// 		}
	// 	);
	//output1 = output.toString();
	//output1 = JSON.parse(output);
	//output1 = JSON.stringify(output);
	//console.log ('output = ' + output1);
	});
};