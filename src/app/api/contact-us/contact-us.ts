
export const apiContactUs = {
    async seenContact(body: any) {
        try {
            const response = await fetch(`${process.env.API_URL}/ContactUs/create-contact-us`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return response;
        }
        catch (error) {
            throw error;
        }
    },
}