(function($) {

	var KirbyResizer = function() {

		var _this = this;

		_this.$resizable = $('[data-resizable]'),
		_this.$anchors = _this.$resizable.parent('a');

		_this.setUp();
		_this.config = window.KirbyResizerConfig || {};

		$('body').on('click', '#resizer--save', function(evt) {
			evt.preventDefault();
			_this.save();
		});
	}

	KirbyResizer.prototype.setUp = function() {
		var _this = this;

		_this.$resizable.each(function() {
			var $el = $(this),
				$anchor = $(this).parents('a').first();

			if (!$el.data('originalWidth')) {
				$el.data({
					originalWidth : $el.width()
				});
			}

			$el.resizable({
				start: function(event, ui) {
					$anchor.addClass('s__resizing');
				},
				stop: function(event, ui ) {
					setTimeout(function() {
						$anchor.removeClass('s__resizing');
					}, 250 );
				},
				aspectRatio: true,
				resize: function(event, ui) {
					var scale = ( ui.size.width/ window.innerWidth ) * 100;
					
					$el.data('scale', scale );
				}
			});
		});

		$('body').append('<button id="resizer--save">Save</button>')


		// Images Block
		_this.$anchors.on('click', function(evt) {
			
			if ( $(this).hasClass('s__resizing') )
				evt.preventDefault();

		})

	}

	KirbyResizer.prototype.save = function() {
		var data = this.toJSON();
		$.post( '/api', {
			action: 'kirby.resizer',
			path: this.config.path,
			jsonString : data,
		}, function(res) {
			console.log(res);
		});
	}

	KirbyResizer.prototype.toJSON = function() {
		var _this = this,
			obj = {};

		_this.$resizable.each(function() {
			var $el = $(this),
				scale = $el.data('scale') || 100,
				filename = $el.data('filename') || $el.attr('src');
				 
			obj[ filename ] = scale;
		});
		
		return JSON.stringify(obj);
	}


	window.KirbyResizer = new KirbyResizer();

}(jQuery))