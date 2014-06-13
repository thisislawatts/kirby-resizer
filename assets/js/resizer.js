(function($) {

	var KirbyResizer = function() {

		var _this = this;

		_this.$resizable = $('[data-resizable]');
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
			var $el = $(this);

			if (!$el.data('originalWidth')) {
				$el.data({
					originalWidth : $el.width()
				});
			}

			$el.resizable({
				aspectRatio: true,
				resize: function(event, ui) {
					var scale = ( ui.size.width/ window.innerWidth ) * 100;
					
					$el.data('scale', scale );
				}
			});
		});

		$('body').append('<button id="resizer--save">Save</button>')
	}

	KirbyResizer.prototype.save = function() {
		var data = this.toJSON();
		$.post( '/api', {
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
				scale = $el.data('scale') || 100;
			obj[$el.data('filename')] = scale;
		});
		
		return JSON.stringify(obj);
	}


	window.KirbyResizer = new KirbyResizer();

}(jQuery))