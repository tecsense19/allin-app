

export const sendOTP = async (countryCode, mobile, deviceToken) => {
    try {
        const response = await fetch('https://allin.website4you.co.in/api/v1/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ country_code: countryCode, mobile: mobile, device_token: deviceToken })
        });

        const data = await response.json();

        if (data?.message === 'OTP Sent successfully') {
            console.log(data.message);
            return { success: true };
        } else {
            return { success: false, error: 'User already exists' };
        }
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: 'Failed to send OTP' };
    }
};

