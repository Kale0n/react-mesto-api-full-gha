class Api {
    constructor(Parameters){
        this._url = Parameters.baseUrl;
        this._headers = Parameters.headers;
    }

    _getHeaders() {
        return {
            ...this._headers,
            authorization: 'Bearer ' + localStorage.token,
        }
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json().then(json => json.data);
          }
          return Promise.reject(`Ошибка: ${res.status}`)
    }

    getInitialCards() {     
        return fetch(`${this._url}/cards`, {headers: this._getHeaders()})
        .then(this._checkResponse);
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {headers: this._getHeaders()})
        .then(this._checkResponse);
    }

    editProfile({name, about}) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers:this._getHeaders(),
            body: JSON.stringify({
              name: name,
              about: about
            })
        }).then(this._checkResponse);
    }

    addNewCard({name, link}) {
        return fetch( `${this._url}/cards`, {
            method: 'POST',
            headers:this._getHeaders(),
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then(this._checkResponse);
    }


    likeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers:this._getHeaders()
        }).then(this._checkResponse);
    }

    dislikeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers:this._getHeaders()
        }).then(this._checkResponse);
    }

    changeCardsLikeStatus(cardId, isLiked) {
        if (isLiked) {
            return this.likeCard(cardId)
        } else {
            return this.dislikeCard(cardId)
        }
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers:this._getHeaders()
        }).then(this._checkResponse);
    }

    changeAvatar({avatar}) {
        return fetch( `${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers:this._getHeaders(),
            body: JSON.stringify({
                avatar: avatar
            })
        }).then(this._checkResponse);
    }
}

const api = new Api({ 
    baseUrl: 'https://api.kaleon.nomoredomains.rocks',
    headers: {
        'Content-Type': 'application/json'}
});

export default api