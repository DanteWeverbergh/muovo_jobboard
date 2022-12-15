<?php


/**
 * Get all alerts for users
 */

function rs_get_alerts_from_user() {
    //

    $user_id = get_current_user_id();

  

  

    $args = [
        'post_type' => 'job_alerts',
        'meta_key' => 'user_id',
        'meta_value' => $user_id,
    ];


    $get_posts = new WP_Query;
    $alerts= $get_posts->query( $args );


    $data = [];
	$i = 0;

    foreach($alerts as $alert) {



        $data[$i]['alert_id'] = $alert->ID;
        $data[$i]['user_id'] = get_field('user_id', $alert->ID);
        $data[$i]['frequency'] = get_field('frequency', $alert->ID);
        $data[$i]['sector'] = wp_get_post_terms( $alert->ID, 'sectors', array('fields' => 'names') );


        $i++;
 

    }

    return $data;

}


add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'alerts/user', [
		'methods' => 'GET',
		'callback' => 'rs_get_alerts_from_user',
        'permission_callback' => function() {
            // if user -> true

            $user_id = get_current_user_id();

            if($user_id){
                return true;
            } else {
                return false;
            }
        }
	]);
    
});