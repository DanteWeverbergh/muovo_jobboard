<?php


/**
 * Get all applicants for a job
 */

 function rs_get_applications() {

    
    $args = [
        'post_type' => 'jobs',
        'name' => $_REQUEST['job'],
        'post_status' => 'publish',
    ];

    $job_query = new WP_Query($args);
    $job = $job_query->query($args);

    $data = [];
    

   foreach($job as $j) {
       $data['id'] = $j->ID;
       $data['title'] = $j->post_title;
       $data['applications'] = get_field('applied_jobseekers', $j->ID);
   }

    $user_ids = $data['applications'];

    $ids = [];
    $i = 0;

    foreach($user_ids as $u_id){
        array_push($ids, $u_id['jobseeker_id']);
        $i++;
    }

//return $ids;

    $user_args = [
        'include' => $ids,
        'fields' => ['ID', 'user_email',  'display_name']
    ];

    $users = get_users($user_args);

    $data['users'] = $users;

  //   return $users;
     return $data;
 }


add_action('rest_api_init', function() {
	register_rest_route('rs/v1', 'jobs/applications', [
		'methods' => 'GET',
		'callback' => 'rs_get_applications',
        'args' => [
            'job' => [
                'description' => 'Slug of job',
                'type' => 'string',
            ],
        ]
       
	]);
    
});