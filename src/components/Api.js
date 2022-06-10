export default class Api{
  constructor(url, tocken){
    this._url = url;
    this._header = {
      'authorization': tocken,
      'Content-Type': 'application/json'
    }
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {headers: this._header})
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject('Ошибка загрузки информации о пользователе');
      })
  }

  getCards() {
    return fetch(`${this._url}/cards`, {headers: this._header})
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject('Ошибка загрузки карточек');
      })
  }
}
