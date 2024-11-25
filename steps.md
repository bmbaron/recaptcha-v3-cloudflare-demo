# Register for a new Recaptcha
- Get the code snippets
- Get the site key and secret key

# Set up a new page on Cloudflare
- connect with GitHub repo
- add the secret key in the env config

# HTML 
- Add the Recaptcha script
- Add the function for generating the token
- Form - trigger the generation on submit

# API
- Cloudflare provided route for handling
- context  --> get the secret and the request data 
- verify the token
