export default class Api{
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

    getUserInfo() {
        const jwt = localStorage.getItem('jwt')
        return fetch(`${this._url}users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : jwt,
            }
        })
            .then(this._checkResponse)
    }

    getInitialCards() {
        const jwt = localStorage.getItem('jwt')
        return fetch(`${this._url}cards`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : jwt,
            }
        })
        .then(this._checkResponse)
    }

    changeeProfileInfo(data) {
        return fetch(`${this._url}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this._checkResponse)
    }

    addNewCard(data) {
        return fetch(`${this._url}cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.naming,
                description: data.description,
                mark: data.mark,
                link: data.link
            })
        })
        .then(this._checkResponse)
    }

    removeCard(id) {
        return fetch(`${this._url}cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._checkResponse)
    }

    addLike(id) {
        return fetch(`${this._url}cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
        .then(this._checkResponse)
    }

    removeLike(id) {
        return fetch(`${this._url}cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._checkResponse)
    }

    updateAvatar(avatar) {
        return fetch(`${this._url}users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
        .then(this._checkResponse)
    }
}
