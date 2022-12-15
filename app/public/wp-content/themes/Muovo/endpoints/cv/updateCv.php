<?php

/**
 * Update cv
 */

function rs_cv_update(WP_REST_Request $request) {

    $parameters = $request->get_file_params();

    $cv = $parameters['file'];

    $wordpress_upload_dir = wp_upload_dir();

    $new_file_path = $wordpress_upload_dir['path'] . '/' . $cv['name'];

    if( empty( $cv ) )
        die( 'File is not selected.' );

    if( $cv['error'] )
        die( $cv['error'] );


        if( move_uploaded_file( $cv['tmp_name'], $new_file_path ) ) {
	

            $upload_id = wp_insert_attachment( array(
                'guid'           => $new_file_path, 
                'post_mime_type' => $parameters['file']['type'],
                'post_title'     => preg_replace( '/\.[^.]+$/', '', $cv['name'] ),
                'post_content'   => '',
                'post_status'    => 'inherit'
            ), $new_file_path );
        
            // wp_generate_attachment_metadata() won't work if you do not include this file
            require_once( ABSPATH . 'wp-admin/includes/image.php' );
        
            // Generate and save the attachment metas into the database
            wp_update_attachment_metadata( $upload_id, wp_generate_attachment_metadata( $upload_id, $new_file_path ) );
        

            /*
            // Show the uploaded file in browser
            wp_redirect( $wordpress_upload_dir['url'] . '/' . basename( $new_file_path ) );
            */
        
        }

        $url = wp_get_attachment_url($upload_id);

        return $url;

        $response['code'] = 200;
		$response['message'] = __("file uploaded");

        return new WP_REST_Response($response, 123);
 }

add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'cv/update', [
		'methods' => 'POST',
		'callback' => 'rs_cv_update',
        'permission_callback' => function () {
            //
           return true;
            
        }
	]);
    
});


 // TODO: user === jobseeker

 // check if user uploaded cv correctly

 // delete old cv 

 // upload new cv

 // 