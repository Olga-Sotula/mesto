export default class UserInfo {
  constructor(selectors) {
    this._titleSelector = selectors.title;
    this._subtitleSelector = selectors.subtitle;
    this._avatarSelector = selectors.avatar;
    this._editButtonSelector = selectors.editButton;
    this._id = "";
    this._avatar = "";
    this._name = "";
    this._description = "";
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
