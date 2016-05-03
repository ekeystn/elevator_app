/*** Core Javascript ***/

;(function($){

	// Set object variable namespace
	if(typeof window.app === 'undefined') {
		window.app = window.app || {};
	}

	var app = window.app;

	app.main = {
		init: function() {
			/* Initialize functions */
			this.buttonEntry();
			//this.buttonScroll();
			this.utilButtons();
		}, // init
		buttonEntry: function(){
			
			/* Set floor input value based on button click */
			var $btns 	= $('#floor-entry, #feature-locations').find('button');


			$btns.each(function(){
				$(this).on('click', function(e){
					e.preventDefault();
					$btns.removeClass('active');

					var $this = $(this);

					if(!$this.hasClass('active')) {
						$this.addClass('active');
						

					} else {
						$this.removeClass('active');
					}

					$('#current-floor').text($this.val());
					
				});
			});
		}, // buttonEntry
		//buttonScroll: function() {
			
		//}, // buttonScroll
		utilButtons: function(){
			/* Handle utility button activation */
			var $btns = $('#util-btns').find('button');

			$btns.on('click', function(){
				var $this = $(this);

				$btns.not('.util-emergency').removeClass('active');

				if(!$this.hasClass('util-emergency')) {
					$this.addClass('active');
					setTimeout(function(){
						$this.removeClass('active');
					}, 5000);
				} else {
					$this.toggleClass('active');
				}
			});
		}, // utilButtons
	};

	$(document).ready(function(){
		app.main.init(); // kick of app.main
	});

})(jQuery);