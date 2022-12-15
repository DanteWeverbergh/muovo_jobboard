<?php


/**
 * Register jobseeker
 */



// get all fields from the form

// Check if all fields are filled in correctly

// check if username already exist

// create user

// update acf fields



//check if cv is uploaded correclty

// upload cv to wordpress

// cv url in acf field in user

// login the user 


function rs_register_jobseeker(WP_REST_Request $request) {


    //
	  $response = array();
    $parameters = $request->get_json_params();
	  $file_params = $request->get_file_params();

	$username = sanitize_text_field($parameters['username']);
    $email = sanitize_text_field( $parameters['email']);
    $password = sanitize_text_field($parameters['password']);
    $role = 'jobseeker';
    $firstname = sanitize_text_field($parameters['firstName']);
    $lastname = sanitize_text_field($parameters['lastName']);

	$error = new WP_Error();

	
    if (empty($username)) {
        $error->add(400, __("Username field 'username' is required.", 'wp-rest-user'), array('status' => 400));
        return $error;
      }
      if (empty($email)) {
        $error->add(401, __("Email field 'email' is required.", 'wp-rest-user'), array('status' => 400));
        return $error;
      }  
      if (empty($password)) {
        $error->add(404, __("Password field 'password' is required.", 'wp-rest-user'), array('status' => 400));
        return $error;
      }
    
    if(empty($firstname)) {
        $error->add(404, __("Firstname field 'firstname' is required.", 'wp-rest-user'), array('status' => 400));
        return $error;
    }
    
    if(empty($lastname)) {
        $error->add(404, __("Lastname field 'lastname' is required and is empty.", 'wp-rest-user'), array('status' => 400));
        return $error;
    }

	$user_id = username_exists($username);
	if (!$user_id && email_exists($email) == false) {
	  $user_id = wp_create_user($username, $password, $email);
	 
	  if (!is_wp_error($user_id)) {
		// Ger User Meta Data (Sensitive, Password included. DO NOT pass to front end.)
		  $user = get_user_by('id', $user_id);
		  $user->set_role($role);
  
  
		  // add first and last name
		  update_user_meta($user_id, 'first_name', $firstname);
		  update_user_meta($user_id, 'last_name', $lastname);
  
		 //update acf
	
       

  
		$response['code'] = 200;
		$response['message'] = __($user_id);
	  } else {
		return $user_id;
	  }
	} else {
	  $error->add(406, __("Email already exists, please try 'Reset Password'", 'wp-rest-user'), array('status' => 400));
	  return $error;
	}



	return new WP_REST_Response($response, 123);
}


add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'register/jobseeker', [
		'methods' => 'POST',
		'callback' => 'rs_register_jobseeker',
	]);
    
});