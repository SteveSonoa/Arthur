$(document).ready(function(){
	// call the add user api on sign up
	$("#signUpButton").on("click", function(event){
		event.preventDefault();

		$("#errorMessage").addClass("hide")

		var firstName = $("#inputFirstName").val();
		var lastName = $("#inputLastName").val();
		var linkedInURL = $("#inputLinkedInURL").val();
		var email = $("#inputEmail").val();
		var password = $("#inputPassword").val();
		
		$.ajax({
			url: APIPath + "/api/add-user",
			data: {
				firstName:firstName,
				lastName:lastName,
				linkedInURL:linkedInURL,
				username:email,
				password:password
			},
			method:"post",
			success: function(res){
				//console.log(res.statusCode);
				window.location.href=APIPath+"/recentSearch.html";
			},
			error: function(res){
				console.log(res);
				if (res.status !== 200){
					let errorMessage = res.responseJSON.data.msg;
					$("#errorMessage").removeClass("hide").text(errorMessage);
				}	

			}
		})
	})

})