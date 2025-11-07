# EmailJS Setup Instructions

This guide will help you set up EmailJS so your contact form can send emails without a backend server.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **Sign Up** (it's free!)
3. Create your account (free plan includes 200 emails/month)

## Step 2: Add an Email Service

1. Log into your EmailJS dashboard
2. Go to **Email Services** in the sidebar
3. Click **Add New Service**
4. Choose your email provider:
   - **Gmail** (recommended for beginners)
   - **Outlook**
   - **Yahoo**
   - Or any other SMTP service
5. Follow the instructions to connect your email account
6. Once connected, you'll see your **Service ID** (e.g., `service_abc123`)
   - **Copy this Service ID** - you'll need it later

## Step 3: Create an Email Template

1. Go to **Email Templates** in the sidebar
2. Click **Create New Template**
3. Choose a starting template or create from scratch
4. In the template editor, set up your email:

   **Subject:** `New Contact Form Submission from {{from_name}}`
   
   **Content:**
   ```
   You have received a new contact form submission from your website.
   
   Name: {{from_name}}
   Email: {{from_email}}
   Phone: {{phone}}
   Business: {{business}}
   Industry: {{industry}}
   Service Interest: {{service}}
   
   Message:
   {{message}}
   
   ---
   This email was sent from the Bloom On Consulting contact form.
   ```

5. In the **To Email** field, enter the email where you want to receive form submissions (e.g., `info@bloomonconsulting.com`)
6. Click **Save**
7. You'll see your **Template ID** (e.g., `template_xyz789`)
   - **Copy this Template ID** - you'll need it later

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in the sidebar
2. Scroll down to find your **Public Key** (also called API Key)
   - It looks like: `abcdefghijklmnop`
   - **Copy this Public Key** - you'll need it later

## Step 5: Update Your JavaScript File

1. Open `script.js` in your code editor
2. Find the `EMAILJS_CONFIG` section (around line 100)
3. Replace the placeholder values with your actual credentials:

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY',      // Paste your Public Key here
    SERVICE_ID: 'YOUR_SERVICE_ID',      // Paste your Service ID here
    TEMPLATE_ID: 'YOUR_TEMPLATE_ID'     // Paste your Template ID here
};
```

**Example:**
```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'abcdefghijklmnop',
    SERVICE_ID: 'service_abc123',
    TEMPLATE_ID: 'template_xyz789'
};
```

## Step 6: Test Your Form

1. Save your `script.js` file
2. Open `contact.html` in your browser
3. Fill out the contact form and submit it
4. Check the email inbox you configured in Step 3
5. You should receive the form submission!

## Troubleshooting

### Form shows "Email service is not configured"
- Make sure you've replaced all three placeholder values in `EMAILJS_CONFIG`
- Check that there are no extra spaces or quotes

### Error when submitting form
- Open your browser's Developer Console (F12)
- Look for error messages
- Common issues:
  - **Invalid Service ID**: Double-check you copied the correct Service ID
  - **Invalid Template ID**: Make sure your template is saved and the ID is correct
  - **Invalid Public Key**: Verify your Public Key is correct
  - **Email service not connected**: Make sure your email service is properly connected in EmailJS dashboard

### Not receiving emails
- Check your spam/junk folder
- Verify the "To Email" address in your email template is correct
- Make sure your email service is connected and active in EmailJS
- Check if you've exceeded the free tier limit (200 emails/month)

## Alternative: Using Formspree

If you prefer a different service, you can also use **Formspree**:

1. Sign up at [https://formspree.io/](https://formspree.io/)
2. Create a new form
3. Get your form endpoint URL
4. Update the form action in `contact.html`:

```html
<form class="contact-form" id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

However, EmailJS is recommended as it's already integrated and provides more customization options.

## Security Notes

- The Public Key is safe to expose in client-side code
- EmailJS has built-in spam protection
- Consider setting up rate limiting in EmailJS dashboard if needed
- For production, consider adding CAPTCHA to prevent spam

## Need Help?

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: Check their help center or community forum

