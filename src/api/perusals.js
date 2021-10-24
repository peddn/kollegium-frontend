export default {
    async getDataByUser(jwt) {
        if (jwt !== '') {
            const result = await fetch('http://localhost:1337/perusals/own', {
                headers: {
                    'Authorization': 'Bearer ' + jwt,
                    "Content-Type": "application/json"
                }
            });
            if (!result.ok) {
                throw new Error('Network response was not ok.');
            }
            const perusals = await result.json();
            return perusals;
        } else {
            throw new Error('You are not logged in.');
        }
    },
    async updateSigned(jwt, perusal, signed) {
        const result = await fetch("http://localhost:1337/perusals/" + perusal.id, {
            method: "PUT",
            headers: {
                'Authorization': 'Bearer ' + jwt,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                signed: signed
            }),
        });
        const perusalNew = await result.json();
        return perusalNew;
    }
}
