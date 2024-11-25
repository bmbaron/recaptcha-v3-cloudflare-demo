# recaptcha-v3-cloudflare-demo
*Hit the ground running with connecting to recaptcha and verifying your tokens on the server*

#### 1. To use this project, you'll need to create your own Cloudflare project and get a page with a domain from there
#### 2. Then you'll need to set up a new Recaptcha and link it to your cloudflare domain
#### 3. You can then paste the site key from Recaptcha into the script in the HTML Head that has a placeholder, and do the same with the grecaptca function sitekey at the bottom of the Body in the HTML
#### 4. Lastly, to get your backend validation working, you'll need to enter the secret key from Recaptcha into your variables section in the Cloudflare settings for your project, and save it as a secret with the name RECAPTCHA_SECRET_KEY

After that, it's up to you to extend this template as you need!

