function searchAnime() {
	$('#anime-list').html('');

	$.ajax({
		url: 'https://api.jikan.moe/v3/search/anime',
		type: 'get',
		dataType: 'json',
		data: {
			'q': $('#search-input').val()
		},
		beforeSend: function () {
			$('#spinner').removeClass('d-none')
		},
		success: function (result) {
			$('#spinner').addClass('d-none');
			let anime = result.results;
			$.each(anime, function (index, data) {
				$('#anime-list').append(`
					<div class="col-sm-3 mb-3">
					<div class="card mx-auto w-100" style="width: 18rem;">
					  <img src="` + data.image_url + `" class="card-img-top" width=200 height=250>
					  <div class="card-body">
					    <h5 class="card-title">` + data.title + `</h5>
					    <h6 class="card-subtitle mb-2 text-dark"><i class="fas fa-star"></i> ` + data.score + `</h6>
					    <h6 class="card-subtitle mb-2 text-muted">` + data.episodes + ` episodes</h6>
					    <h6 class="card-subtitle mb-2 text-dark">` + data.type + `</h6>
					    <a href = "https://myanimelist.net/anime/` + data.mal_id + `" class = "btn btn-primary" target="_blank"> More Info </a>
					  </div>
					</div>
					</div>`);
			});

			$('#search-input').val('');
			$('#search-input').blur();
			$('#search-button').blur();


		}
	});
}

$('#search-button').click(function () {
	searchAnime();
});

$('#search-input').keypress(function (e) {
	if (e.keyCode === 13) {
		searchAnime();
	}
});