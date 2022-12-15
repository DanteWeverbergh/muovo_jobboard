<?php

/**
 * Register company user
 */

 
// get all fields from the form

// check if all fields are filled in correctly

// check if user already exists

// register user

// update acf fields



// Put user in the acf field in company

// Update acf field in user with the company name




function rs_register_companyuser() {
    //



    return 'create new user';
}



add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'register/companyUser', [
		'methods' => 'POST',
		'callback' => 'rs_register_companyuser',
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

