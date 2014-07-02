<?php if(!defined('KIRBY') && !isset($_POST['resizersecret'])) die('Direct access is not allowed');

/* TODO: Fix ajax calls to resizer js */
if ( r::is_ajax() && r::get('action') === 'kirby.resizer' ) {


	
	if ( KirbyResizer::saveToJSON( r::get('path'), r::get('jsonString') ) ) {
		echo json_encode( array('status' => 'ok' ) );
	} else {
		echo json_encode( array('status' => 'error' ) );
	}

	exit();
}

/* Save JSON to file */

class KirbyResizer {

	function __construct( ) {

		if (isset($_POST['jsonString']))
			$this->saveToJSON();
	}

	function saveToJSON($path, $data) {
		return f::write( $path . '/_resizer.json', $data ) > 0;
	}
}
