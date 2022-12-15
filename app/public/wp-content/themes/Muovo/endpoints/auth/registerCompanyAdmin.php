<?php


/**
 * Register company Admin
 */




function rs_register_company(WP_REST_Request $request) {

    $response = array();
    $parameters = $request->get_json_params();
// get all fields from the form

    //user
    $username = sanitize_text_field($parameters['username']);
    $email = sanitize_text_field( $parameters['email']);
    $password = sanitize_text_field($parameters['password']);
    $role = sanitize_text_field($parameters['password']);
    $firstname = sanitize_text_field($parameters['first_name']);
    $lastname = sanitize_text_field($parameters['last_name']);


    //company
    $companyName = sanitize_text_field($parameters['companyName']);


// check if all fields are filled in correctly
    $error = new WP_Error();
    if (empty($companyName)) {
        $error->add(400, __("Company is empty field is required.", 'wp-rest-user'), array('status' => 400));
        return $error;
    }
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
    if(empty($role)) {
        $error->add(404, __("role field 'lastname' is required and is empty.", 'wp-rest-user'), array('status' => 400));
        return $error;
    }

    $role = ('companyadmin');

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

          
  
  
        $response['code'] = 200;
        $response['message'] = __("User '" . $username . "' Registration was Successful", "wp-rest-user");
      } else {
        return $user_id;
      }
    } else {
      $error->add(406, __("Email already exists, please try 'Reset Password'", 'wp-rest-user'), array('status' => 400));
      return $error;
    }
   



// check if company already exists
    $args = [
        'numberposts' => 99999,
        'post_type' => 'Company'
    ];

    $posts = get_posts($args);

	$data = [];
	$i = 0;


    foreach($posts as $post) {
	
		$data[$i] = strtolower($post->post_title);
		
		$i++;
	}

    if(!in_array($companyName, $data)){

        $id = wp_insert_post(array(
            'post_title' => $companyName,
            'post_type' => 'Company',
            'post_status' => 'draft'
        ));

        update_field('admin_user_id', $user_id, $id);


        //update acf fields in companyAdmin users

        the_field('company', $companyName, 'user_'.$user_id);
        the_field('company_id', $companyName, 'user_'.$user_id);


        // send email to admin
        wp_mail('test@email.com', 'New company (' . $companyName . ')', 'There is a new company' . $companyName . 'created on your site');


    }else {
        $error->add(400, __("Company already exists", 'wp-rest-user'), array('status' => 400));
        return $error;
    }

    $response['code'] = 200;
    $response['message'] = __($companyName . "created succesfully!" );
   

    return new WP_REST_Response($response, 123);

// Create company

// Put user in the acf field in company

// Update acf field in user with the company name

    return $data;
}


add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'register/company', [
		'methods' => 'POST',
		'callback' => 'rs_register_company',
	]);
    
});

