export default class UserInfo {
  constructor(info) {
    this._id = info.id;
    this._avatar = info.avatar;
    this._name = info.name;
    this._description = info.description;
  }

  setId(id){
    this._id = id;
  }

  getId() {
    return this._id;
  }

  setAvatar(link) {
    this._avatar = link;
  }

  getAvatar() {
    return this._avatar;
  }

  getUserInfo() {
    return {name: this._name, description: this._description};
  }

  setUserInfo(info) {
    this._name = info.name;
    this._description = info.description;
  }
}
