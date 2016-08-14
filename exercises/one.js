module.exports = function(mongoose, Checkout, Movie) {
	// What user(s) had the most checkouts?

	Checkout.aggregate (
		{ $group: { _id: { UserID: "$userId" }, count:{ $sum: 1 }}},
		{ $sort:{ "count": -1} }, 
		function(err, result){
			if (err){
				console.log('error reading database');
			} else {
				var highUser = result[0]._id;
				var highCount = result[0].count;
				var hUtext = JSON.stringify(highUser);
				var x;
				//console.log("typeof = " + typeof(result));
				if (hUtext.substr(12) === '}'){
					x = 2;
				} else {
					x = 3;
				} 
				console.log("User " + hUtext.substr(10, x) + " had " + highCount + " checkouts, the most in the last 12 months.");
			}
		}
	);
};
