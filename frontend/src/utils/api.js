class Api {
  constructor(options) {
    this._url = options.baseUrl;
    // this._headers = options.headers;
    // this._authorization = options.headers.authorization;
  }

  _check(res) {
    if (res.ok) {
      return res.json();
    } // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  _request(url, options) {
    return fetch(url, options).then(this._check);
  }

  //загрузка профиля с сервера
  getInitialInfo(token) {
    return this._request(`${this._url}/users/me`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });
  }

  //загрузка карточки с сервера
  getInitialCards(token) {
    return this._request(`${this._url}/cards`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
  }

  ///card
  addCard(data, token) {
    return this._request(`${this._url}/cards`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: data.title,
        link: data.image,
      }),
    });
  }

  // профиль
  setUserInfo(data, token) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: data.profileName,
        about: data.profileJob,
      }),
    });
  }

  //avatar
  setUserAvatar(data, token) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }

  ///like
  addLike(data, token) {
    return this._request(`${this._url}/cards/${data}/likes`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
  }

  deleteLike(data, token) {
    return this._request(`${this._url}/cards/${data}/likes`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
  }

  deleteCard(data, token) {
    return this._request(`${this._url}/cards/${data}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
  }
}

const api = new Api({
  baseUrl: "https://mestobekend.nomoredomainsicu.ru",
  // headers: {
  //   authorization: "69b59d5b-f26f-4db1-9d60-b5f1c83af874",
  //   "Content-Type": "application/json",
  // },
});

export default api;
