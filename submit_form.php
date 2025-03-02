<?php
// submit_form.php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Get form data
  $name = htmlspecialchars($_POST['name']);
  $email = htmlspecialchars($_POST['email']);
  $message = htmlspecialchars($_POST['message']);

  // Validate input
  if (empty($name) || empty($email) || empty($message)) {
    die('Please fill all fields.');
  }

  // Telegram bot details
  $botToken = 'YOUR_TELEGRAM_BOT_TOKEN';
  $chatId = 'YOUR_CHAT_ID'; // Your Telegram chat ID
  $telegramMessage = "New Help Request:\n\nName: $name\nEmail: $email\nMessage: $message";

  // Send data to Telegram bot
  $telegramUrl = "https://api.telegram.org/bot$botToken/sendMessage";
  $telegramData = [
    'chat_id' => $chatId,
    'text' => $telegramMessage,
  ];

  $options = [
    'http' => [
      'header' => "Content-type: application/x-www-form-urlencoded\r\n",
      'method' => 'POST',
      'content' => http_build_query($telegramData),
    ],
  ];

  $context = stream_context_create($options);
  $result = file_get_contents($telegramUrl, false, $context);

  if ($result === FALSE) {
    die('Error sending data to Telegram.');
  }

  // Save data to website backend (e.g., database or file)
  $data = "Name: $name\nEmail: $email\nMessage: $message\n\n";
  file_put_contents('help_requests.txt', $data, FILE_APPEND);

  // Redirect user to a thank-you page
  header('Location: thank_you.html');
  exit();
} else {
  die('Invalid request.');
}
