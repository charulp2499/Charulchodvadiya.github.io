<?php

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $receiving_email_address = 'charulpatel2499@gmail.com';

    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $subject = $_POST['subject'] ?? '';
    $message = $_POST['message'] ?? '';

    $headers = "From: $name <$email>" . "\r\n";

    $mailSent = mail($receiving_email_address, $subject, $message, $headers);

    echo json_encode(['status' => $mailSent]);
} else {
    http_response_code(405);
    echo json_encode(['status' => false, 'error' => 'Method Not Allowed']);
}
?>
