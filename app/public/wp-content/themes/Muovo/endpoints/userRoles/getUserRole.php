<?php


/**
 * Get user role
 */

/*
function rs_get_user_role() {
    $args = [
		'numberposts' => 99999,
		'post_type' => 'Company'
	];

	$posts = get_posts($args);

	$data = [];
	$i = 0;

	foreach($posts as $post) {
		$data[$i]['id'] = $post->ID;
		$data[$i]['title'] = $post->post_title;
		
		$i++;
	}
	return $data;
}
*/





function rs_get_user_company() {
   
    $id = get_current_user_id();



    $data = [];



    $id = get_current_user_id();

    $user = get_userdata($id);

    $roles = (array) $user->roles;

    $data['role'] = $roles[0];
    $company = the_field('company', 'user_' . $id);
    



    return $company;


}


add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'user/company', [
		'methods' => 'GET',
		'callback' => 'rs_get_user_company',
	]);
    
});