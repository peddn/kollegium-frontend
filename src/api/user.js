export default {
    async login(creds) {
        const result = await fetch("http://localhost:1337/auth/local", {
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
