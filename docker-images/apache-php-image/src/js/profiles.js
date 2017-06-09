$(function() {
	function loadProfiles()
	{
		$.getJSON("/api/profiles/", function( profiles ) {
			console.log(profiles);
			var message = "Nobody is here";
			if (profiles.length > 0)
			{
				message = profiles[0].avatar + " " + profiles[0].email;
			}
			$(".text-muted").text(message);
		});
	};

	loadProfiles();

	setInterval( loadProfiles, 3000);
});