export default {
  async fetch(request) {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Animated Contact Form</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        }

        body {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #2a2a72;
            background-image: linear-gradient(315deg, #2a2a72 0%, #009ffd 74%);
        }

        .container {
            position: relative;
            max-width: 500px;
            width: 100%;
            background: #fff;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
            transform: translateY(50px);
            opacity: 0;
            animation: floatUp 0.8s forwards;
        }

        @keyframes floatUp {
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        .container header {
            font-size: 1.5rem;
            color: #333;
            font-weight: 600;
            text-align: center;
            margin-bottom: 30px;
        }

        .form .input-box {
            width: 100%;
            margin-top: 20px;
            position: relative;
        }

        .input-box input, .input-box textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #ddd;
            border-radius: 6px;
            font-size: 1rem;
            transition: all 0.3s ease;
        }

        .input-box textarea {
            resize: vertical;
            min-height: 100px;
        }

        .input-box label {
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: #666;
            pointer-events: none;
            transition: all 0.3s ease;
        }

        .input-box input:focus ~ label,
        .input-box input:valid ~ label,
        .input-box textarea:focus ~ label,
        .input-box textarea:valid ~ label {
            top: 0;
            font-size: 0.8rem;
            background: #fff;
            padding: 0 6px;
            color: #009ffd;
        }

        .input-box input:focus,
        .input-box textarea:focus {
            border-color: #009ffd;
            outline: none;
            box-shadow: 0 0 8px rgba(0, 159, 253, 0.3);
        }

        .form button {
            width: 100%;
            margin-top: 30px;
            padding: 12px;
            background: #009ffd;
            color: #fff;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 500;
            transition: all 0.3s ease;
        }

        .form button:hover {
            background: #0077cc;
            transform: translateY(-2px);
        }

        .success-message {
            display: none;
            text-align: center;
            padding: 20px;
            background: #4BB543;
            color: white;
            border-radius: 6px;
            margin-top: 20px;
            animation: scaleIn 0.3s ease;
        }

        @keyframes scaleIn {
            from {
                transform: scale(0.8);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }

        .checkmark {
            font-size: 40px;
            margin-bottom: 10px;
            animation: checkmark 0.5s ease;
        }

        @keyframes checkmark {
            0% { transform: scale(0); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>Contact Form</header>
        <form class="form" id="contactForm">
            <div class="input-box">
                <input type="text" required>
                <label>Your Name</label>
            </div>
            <div class="input-box">
                <input type="email" required>
                <label>Email Address</label>
            </div>
            <div class="input-box">
                <textarea required></textarea>
                <label>Your Message</label>
            </div>
            <button type="submit">Send Message</button>
        </form>
        <div class="success-message">
            <div class="checkmark">✓</div>
            <h3>Message Sent!</h3>
            <p>We'll get back to you soon</p>
        </div>
    </div>

    <script>
        const form = document.getElementById('contactForm');
        const successMessage = document.querySelector('.success-message');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (form.checkValidity()) {
                const formData = {
                    name: form.querySelector('input[type="text"]').value,
                    email: form.querySelector('input[type="email"]').value,
                    message: form.querySelector('textarea').value
                };

                // Replace with your Telegram bot token and chat ID
                const botToken = '7251168093:AAGD-rpyP3imrWZ9gocWIJHeeafTaCeC9fs';
                const chatId = '7315529282';
                
                const messageText = `New Message!\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
                
                try {
                    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            chat_id: chatId,
                            text: messageText
                        })
                    });

                    form.reset();
                    form.style.display = 'none';
                    successMessage.style.display = 'block';
                    
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                        form.style.display = 'block';
                    }, 3000);
                } catch (error) {
                    console.error('Error:', error);
                    alert('Error sending message. Please try again.');
                }
            }
        });

        // Add input animations
        document.querySelectorAll('.input-box input, .input-box textarea').forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim() !== '') {
                    input.parentNode.querySelector('label').style.color = '#009ffd';
                } else {
                    input.parentNode.querySelector('label').style.color = '#666';
                }
            });
        });
    </script>
</body>
</html>`;
    
    return new Response(html, {
      headers: { "Content-Type": "text/html" },
    });
  },
};
