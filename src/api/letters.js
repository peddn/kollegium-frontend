import { findIconDefinition } from "@fortawesome/fontawesome-svg-core";

export default {
    async getData(jwt) {
        if (jwt !== '') {
            const response = await fetch('http://localhost:1337/letters', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jwt,
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const result = await response.json();
            return result;
        } else {
            throw new Error('You are not logged in.');
        }
    },
    async create(jwt, formData) {
        if (jwt !== '') {
            const response = await fetch('http://localhost:1337/letters', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + jwt
                },
                body: formData
            });
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const result = await response.json();
            return result;
        } else {
            throw new Error('You are not logged in.');
        }
    },
    async remove(jwt, id) {
        if (jwt !== '') {
            const response = await fetch('http://localhost:1337/letters/' + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + jwt,
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const result = await response.json();
            return result;
        } else {
            throw new Error('You are not logged in.');
        }
    },
    async getExport(jwt, payload) {
        const id = payload.id;
        const format = payload.format;
        if (jwt !== '') {
            const response = await fetch(
                "http://localhost:1337/letters/" +
                id +
                "?" +
                new URLSearchParams({
                    format: format
                }),
                {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + jwt,
                    },
                }
            );
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const blob = await response.blob();
            const file = window.URL.createObjectURL(blob);
            window.location.assign(file);



            //return result;
        } else {
            throw new Error('You are not logged in.');
        }
    }
}
