<?php

/**
 * Rest API auth forgotpassword
 * Plugin url: https://wordpress.org/plugins/bdvs-password-reset/
 */




 /**
 * Filter all emails to adjust the headers
 *
 * @param array $args wp_mail arguments
 * @return array updated wp_mail arguments
 *
 */

function my_mail_filter( $args ) {
  
    //if headers already exist but not as an array, change it to be an array to allow additional headers
    if( isset( $args['headers'] ) && ! is_array( $args['headers'] ) ) {
      $existing_headers = $args['headers'];
      unset( $args['headers'] );
      $args['headers'][] = $existing_headers;
    }
  
    $args['headers'][] = 'Content-Type: text/html; charset=UTF-8';
    return $args;
}
  
add_filter( 'wp_mail' , 'my_mail_filter' );


//change subject of meial

add_filter( 'bdpwr_code_email_subject' , function( $subject ) {
    return 'Password Reset Muovo';
}, 10 , 1 );

//chage length of code

add_filter( 'bdpwr_code_length' , function( $length ) {
    return 6;
}, 10 , 1 );


//change text

add_filter( 'bdpwr_code_email_text' , function( $text , $email , $code , $expiry ) {




    $text = "Password reset has been requested for the following email :  " . $email . ". \n will expire at " . bdpwr_get_formatted_date( $expiry ) . "." . "<br/>" . 'Please click on the following link to reset your password. ' . "<br/>" . "<a>" ."http://localhost:10009/auth/newpassword/?email="  . $email . '&code=' . $code . '</a>';
    $otherText = 'test';

    ob_start();?>
        <h1>You have requested a password reset.</h1>
        <p><?php echo $text ?></p>
        
    <?php
    $html = ob_get_clean();
    return html_entity_decode($html);



//return  'Please click on the following link to reset your password. ' . 'http://localhost:3000/newpassword/?email=' . $email . '&code=' . $code;
}, 10 , 4 );


// change time to 10 minutes

add_filter( 'bdpwr_code_expiration_seconds' , function( $seconds ) {
    return 600;
}, 10 , 1 );



/*

password change for country

add_filter( 'bdpwr_allowed_roles' , function( $roles ) {

    $key = array_search( 'administrator' , $roles );
  
    if( $key !== false ) {
      unset( $roles[ $key ] );
    }
  
    return $roles;
  
  }, 10 , 1 );

  */