export default class UserInfo {
  constructor(info) {
    this._name = info.name;
    this._description = info.description;
  }

  getUserInfo() {
    return {name: this._name, description: this._description};
  }

  setUserInfo(info) {
    this._name = info.name;
    this._description = info.description;
  }
}
