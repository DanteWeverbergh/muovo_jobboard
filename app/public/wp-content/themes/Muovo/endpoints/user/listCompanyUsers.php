<?php



/**
 * List company users
 */


 function rs_list_companyusers() {


    /**
     * 
     * 
     * 
      $args = array( 'meta_query' => 
    array(
    array( 
       'relation' => 'OR', 
       array( 'key' => 'last_name', 'value' => $search_string, 'compare' => 'LIKE' ), 
       array( 'key' => 'first_name', 'value' => $search_string, 'compare' => 'LIKE' ),
    ), 
    array( 'key' => 'user_city', 'value' => $Location, 'compare' => 'LIKE' ), ), 
);
     */
    
//
 }


add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'user/companyuser', [
		'methods' => 'POST',
		'callback' => 'rs_list_companyusers',
        'permission_callback' => function() {
            //
           $user = wp_get_current_user();
           $roles = $user->roles;

           //only allow companyADmins to user this ruote
           if(in_array( 'companyadmin', $roles)){
               return true;
           } else {
               return false;
           }
        }
	]);
    
});