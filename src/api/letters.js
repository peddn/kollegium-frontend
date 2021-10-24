export default {
    async getData(jwt) {
        if (jwt !== '') {
            const result = await fetch('http://localhost:1337/letters', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jwt,
                    "Content-Type": "application/json"
                }
            });
            if (!result.ok) {
                throw new Error('Network response was not ok.');
            }
            const letters = await result.json();
            return letters;
        } else {
            throw new Error('You are not logged in.');
        }
    },
    async createLetter(jwt, formData) {
        if (jwt !== '') {
            const result = await fetch('http://localhost:1337/letters', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + jwt
                },
                body: formData
            });
            if (!result.ok) {
                console.log(result)
                throw new Error('Network response was not ok.');
            }
            const letter = await result.json();
            return letter;
        } else {
            throw new Error('You are not logged in.');
        }
    }
}
