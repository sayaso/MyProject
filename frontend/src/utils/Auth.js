export default class Auth {
    constructor(settings) {
        this._url = settings.url
        this._headers = settings.headers
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    signUp(data) {
        return fetch(`${this._url}signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                'password': data.password,
                'email': data.email
            })
        })
            .then(this._checkResponse)
    }

    signIn(data) {
        return fetch(`${this._url}signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                'password': data.password,
                'email': data.email
            })
        })
            .then(this._checkResponse)
    }
    checkJWT(token) {
        return fetch(`${this._url}users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            },
        })
            .then(this._checkResponse)
    }
}
