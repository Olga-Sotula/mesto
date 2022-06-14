export default class UserInfo {
  constructor(info) {
    this._id = info.id;
    this._name = info.name;
    this._description = info.description;
  }

  setUserId(id){
    this._id = id;
  }

  getUserId() {
    return this._id;
  }

  getUserInfo() {
    return {name: this._name, description: this._description};
  }

  setUserInfo(info) {
    this._name = info.name;
    this._description = info.description;
  }
}
