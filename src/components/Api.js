export default class Api {
  constructor(baseUrl, groupId, tocken) {
    this._url = `${baseUrl}/${groupId}`;
    this._header = {
      'authorization': tocken,
      'Content-Type': 'application/json'
    }
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
        headers: this._header
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject('Ошибка загрузки информации о пользователе');
      })
  }

  updateUserProfile(profile) {
    return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._header,
        body: JSON.stringify(profile)
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject('Ошибка обновления профайла');
      })
    fetch('https://mesto.nomoreparties.co/v1/cohortId/', {
      method: 'PATCH',
      headers: {
        authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Marie Skłodowska Curie',
        about: 'Physicist and Chemist'
      })
    });
  }


  getCards() {
    return fetch(`${this._url}/cards`, {
        headers: this._header
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject('Ошибка загрузки карточек');
      })
  }
}
