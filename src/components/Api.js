export default class Api {
  constructor(baseUrl, groupId, tocken) {
    this._url = `${baseUrl}/${groupId}`;
    this._header = {
      'authorization': tocken,
      'Content-Type': 'application/json'
    }
  }

  _handleResponse(res, err){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(err);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
        headers: this._header
      })
      .then((res) => {
        return this._handleResponse(res, 'Ошибка загрузки информации о пользователе');
      })
  }

  updateUserProfile(profile) {
    return fetch(`${this._url}/users/m`, {
        method: 'PATCH',
        headers: this._header,
        body: JSON.stringify(profile)
      })
      .then((res) => {
        return this._handleResponse(res,'Ошибка обновления профайла');
      })
  }


  getCards() {
    return fetch(`${this._url}/cards`, {
        headers: this._header
      })
      .then((res) => {
        return this._handleResponse(res,'Ошибка загрузки карточек');
      })
  }
}
