<?php if(!defined('KIRBY') && !isset($_POST['resizersecret'])) die('Direct access is not allowed');

/* Save JSON to file */


class KirbyResizer {

	function __construct() {

		$this->saveToJSON();
	}

	function saveToJSON( ) {
		$file = f::write( $_POST['path'] . '/_resizer.json', $_POST['jsonString'] );
	}

}
