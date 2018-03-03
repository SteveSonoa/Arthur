$(document).ready(function(){
	// call the login api on sign in
	$("#signInButton").on("click", function(event){
		event.preventDefault();

		var email = $("#inputEmail").val();
		var password = $("#inputPassword").val();
		
		$.ajax({
			url: APIPath + "/api/login",
			data: {
				username:email,
				password:password
			},
			method:"post"
		}).then(function(res){

			if (res.status !== 200){
				let errorMessage = res.data.msg;
				$("#errorMessage").removeClass("hide").text(errorMessage);
			}
			else{ 
				window.location.href=APIPath+"/recentSearch.html";
			}
		})

	})

})