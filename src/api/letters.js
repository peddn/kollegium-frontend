export default {
    async getData(jwt) {
        if (jwt !== '') {
            const result = await fetch('http://localhost:1337/letters', {
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
    }
}
