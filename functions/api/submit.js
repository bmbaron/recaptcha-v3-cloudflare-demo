
// context from cloudflare includes access to the request that was sent and the env data entered into Cloudflare
export async function onRequestPost(context) {

	const formData = await context.request.formData();
	const formObject = Object.fromEntries(formData.entries());
	const token = formObject['g-recaptcha-response'];
	if (!token) {
		return new Response(JSON.stringify({success: false, error: 'No reCAPTCHA token provided'}), {status: 400});
	}

	const recaptchaSecretKey = context.env.RECAPTCHA_SECRET_KEY;
	if (!recaptchaSecretKey) {
		return new Response(JSON.stringify({success: false, error: 'Unable to access the recaptcha secret key'}), {status: 400});
	}

	try {
		const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${token}`;
		const verificationResponse = await fetch(verificationUrl, {
			method: 'POST',
		});
		const verificationResult = await verificationResponse.json();

		if (!verificationResult.success) {
			console.log(JSON.stringify(verificationResult));
			return new Response(JSON.stringify({
				success: false,
				message: 'Form recaptcha could not be validated',
				details: verificationResult
			}), {status: 403});

		}
		if (verificationResult.score < 0.5) {
			console.log(JSON.stringify(verificationResult));
			return new Response(JSON.stringify({success: false, message: 'Validation failed. Aborted'}), {status: 403});
		}

		else {
			console.log(JSON.stringify(verificationResult));
			return new Response(
				JSON.stringify({
					success: true,
					message: 'Form recaptcha validated successfully.',
					submittedData: formObject
				}),
				{status: 200}
			);
		}
	} catch (error) {
		return new Response(JSON.stringify({success: false, error: error.message}), {status: 500});
	}
}