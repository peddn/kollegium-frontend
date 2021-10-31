const ROOT_URL = process.env.ROOT_URL;

export default {
    async login(creds) {
        const result = await fetch(ROOT_URL + '/auth/local', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(creds),
        });
        if (!result.ok) {
            console.log(result)
            throw new Error(result.status + ': ' + result.statusText)
        }
        const userdata = await result.json()
        return userdata
    }
}
