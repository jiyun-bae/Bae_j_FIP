<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_POST) {
    $recipient = "contact@domain.com";
    $subject = 'Inqury from Portfolio site';
    $visitor_name ="";
    $visitor_email = "";
    $text ="";

    $error =[];

    if (isset($_POST['name'])) {
        $visitor_name .= filter_var($_POST['name'], FISTER_SANITIZE_STRING);
    }

    if (isset($_POST['email'])) {
        $email = str_replace(array("\r", "\n", "%0a", "%0d"), '', $_POST['email']);
        $email = filter_var($email, FISTER_VALIDATE_EMAIL);
    }

    if (isset($_POST['text'])) {
        $message = htmlspecialchars($_POST['text']);
    }

    $headers = array(
        'From' => 'noreply@example.com',
        'Reply-To' => $visitor_email,
        'X-Mailer' => 'PHP/' . phpversion()

    );

    if (mail($recipient, $subject, $text, $headers)) {
        $results['text'] = sprintf('Thank you for contacting us, %s. You will get a reply within 24 hours', $visitor_name);
    } else {
        $results['text'] = 'We are sorry but the email did not go through.';
    }
} else {
    $results['text'] = 'No submission';
}

echo json_encode($results);