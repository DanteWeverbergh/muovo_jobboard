<?php


/**
 * Send email to user who signed up for instant alerts
 */


//


function new_job_posted($sector, $job_title, $company, ) {

    //tax query
    $tax_query = array (
        array(
            'taxonomy' => 'sectors',
            'field' => 'slug',
            'terms' => $sector,
        ));

    $args = [
        'post_type' => 'job_alerts',
        'number_of_posts' => 9999,
        'tax_query' => $tax_query,
    ];

    $alert_query = new WP_Query($args);
    $alerts = $alert_query->query($args);

    if($alert_query->have_posts()){
        
        $data = [];
        $i = 0;

        foreach($alerts as $alert){
            $data[$i]['alert_id'] = $alert->ID;
            $data[$i]['user_id'] = get_field('user_id', $alert->ID);
            $data[$i]['user_email'] =  get_userdata(get_field('user_id', $alert->ID))->user_email;
            $data[$i]['full_name'] = get_userdata(get_field('user_id', $alert->ID))->first_name . ' ' . get_userdata(get_field('user_id', $alert->ID))->last_name;

            //send mail

            $subject = 'New job posted in ' . $sector;
            $to = get_userdata(get_field('user_id', $alert->ID))->user_email;
            $mail_header = 'Hi ' . get_userdata(get_field('user_id', $alert->ID))->first_name . ' ' . get_userdata(get_field('user_id', $alert->ID))->last_name . ',';
            $mail_text = $company . ' has just posted a new job in ' . $sector . ': <br/>'
            . $job_title;
            
            ob_start();?>
            
            <h1><?php echo $mail_header ?></h1>
            <p><?php echo $mail_text ?></p>
        
            <?php
              //html text
            $html_mail = ob_get_clean();

            wp_mail($to, $subject,  html_entity_decode($html_mail));

            $i++;
        }
    }

}


// add_action('rest_api_init', function() {
// 	register_rest_route('rs/v1', 'test/alerts', [
// 		'methods' => 'GET',
// 		'callback' => 'new_job_posted',
// 	]);
    
// });

