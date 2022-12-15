<?php

//email
include 'includes/email/forgotPassword.php';
include 'includes/getNumberOfPosts.php';
include 'includes/email/contactMail.php';
//include 'includes/email/passwordReset.php';

//endpoints
include 'endpoints/endpoints.php';






/***
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * Test
 */

include 'includes/email/alerts/newJobPosted.php';


// Allow current user to update own profile
add_filter( 'acf/rest_api/item_permissions/update', function( $permission, $request, $type ) {
    if ( 'user' == $type && method_exists( $request, 'get_param' ) && get_current_user_id() == $request->get_param( 'id' ) ) {
        return true;
    }
    return $permission;
}, 10, 3 );

// Allow user acf rest user update to be detected as location "user_form".
add_filter( 'acf/location/screen', function( $screen, $deprecated ) {
    if(!empty($screen['post_id']) && preg_match("/^user_\d+$/i",$screen['post_id'])){
       $screen = wp_parse_args($screen, array(
           'user_form'    => 'edit'
       ));
    }
    return $screen;
}, 10, 2 );





/*
add_action('init', 'handle_preflight');
function handle_preflight() {
    $origin = get_http_origin();
    if ($origin === 'http://localhost:10010') {
        header("Access-Control-Allow-Origin: http://localhost:10010");
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
        header("Access-Control-Allow-Credentials: true");
        header('Access-Control-Allow-Headers: Origin, X-Requested-With, X-WP-Nonce, Content-Type, Accept, Authorization');
        if ('OPTIONS' == $_SERVER['REQUEST_METHOD']) {
            status_header(200);
            exit();
        }
    }
}
add_filter('rest_authentication_errors', 'rest_filter_incoming_connections');
function rest_filter_incoming_connections($errors) {
    $request_server = $_SERVER['REMOTE_ADDR'];
    $origin = get_http_origin();
    if ($origin !== 'http://localhost:10010') return new WP_Error('forbidden_access', $origin, array(
        'status' => 403
    ));
    return $errors;
}
*/


add_theme_support( 'post-thumbnails' );

