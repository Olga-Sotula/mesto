export default class UserInfo {
  constructor(selectors) {
    this._titleSelector = selectors.title;
    this._subtitleSelector = selectors.subtitle;
    this._avatarSelector = selectors.avatar;
    this._editButtonSelector = selectors.editButton;
    this._titleElement = document.querySelector(this._titleSelector);
    this._subtitleElement = document.querySelector(this._subtitleSelector);
    this._avatarElement = document.querySelector(this._avatarSelector);
    this._editButtonElement = document.querySelector(this._editButtonSelector);
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
    this._avatarElement.src = link;
  }

  getAvatar() {
    return this._avatar;
  }

  getUserInfo() {
    return {name: this._name, description: this._description};
  }

  setProfile(data) {
    this._name = data.name;
    this._description = data.description;
  }

  setInfo(info) {
    this.setId(info._id);
    this._name = info.name;
    this._description = info.about;
    this.setAvatar(info.avatar);
  }

  setEventListeners(openPopupAvatarWindow, openPopupProfileWindow){
    this._avatarElement.addEventListener('click', openPopupAvatarWindow);
    this._editButtonElement.addEventListener('click', openPopupProfileWindow);
  }

  renderProfile() {
    this._titleElement.textContent = this._name;
    this._subtitleElement.textContent = this._description;
  }
}
