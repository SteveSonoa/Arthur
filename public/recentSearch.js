$(document).ready(function(){
	//go and get our api stuff from twitter, linkedin and nytimes
	$("#searchButton").on("click", function(event){
		event.preventDefault();

		var companyName = $("#inputCompany").val();
		var twitterHandle = $("#inputTwitter").val();
		
		$("#inputCompany").val("");
		$("#inputTwitter").val("");

		$.ajax({
			url: APIPath + "/api/socialmedia",
			data: {
				twitterHandle:twitterHandle,
				companyName:companyName
			},
			method:"post"
		}).then(function(res){
			
			$("#results").removeClass("hide");
			$("#well-section4").empty();
			$("#well-section2").empty();

			//show NY Times articles
			var nytArticles = res.data.nytimes[0];
			console.log(nytArticles);
			nytArticles.forEach(function(article){

				var web_url = $("<a>").attr("href", article.web_url).attr("target", "_blank").text(article.print_headline);

				var headline = $("<h3>").append(web_url);
				var snippet = $("<h5>").text(article.snippet);
				var pub_date = $("<p>").text(article.pub_date);

				
				$("#well-section4").append(headline).append(snippet).append(pub_date);
			})

			//show twitter results
			var tweets = res.data.twitter[0].data;
			console.log(tweets);
			
			var twitter_profilePhoto = res.data.twitter[0].profile_image_url
			console.log(twitter_profilePhoto);
			var photo = $("<img>").attr("src", twitter_profilePhoto);


			var twitter_description = res.data.twitter[0].description;
			console.log(twitter_description);
			var description = $("<p>").text(twitter_description);

			var tweetsDiv = $("<div>")
			tweets.forEach(function(tweet){
				//create a h3 tag for each tweet and append it to tweetsDiv
				var tweetTag = $("<h3>").text(tweet.text);
				tweetsDiv.append(tweetTag);
			})
			$("#well-section2").append(photo).append(description).append(tweetsDiv);
			
		})
		
	});
})