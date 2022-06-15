export default class UserInfo {
  constructor(selectors) {
    this._titleElement = document.querySelector(selectors.title);
    this._subtitleElement = document.querySelector(selectors.subtitle);
    this._avatarElement = document.querySelector(selectors.avatar);
    this._avatarButtonElement = document.querySelector(selectors.avatarButton);
    this._editButtonElement = document.querySelector(selectors.editButton);
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
    this.setProfile({name: info.name, description: info.about});
    this.setAvatar(info.avatar);
  }

  setEventListeners(openPopupAvatarWindow, openPopupProfileWindow){
    this._avatarButtonElement.addEventListener('click', openPopupAvatarWindow);
    this._editButtonElement.addEventListener('click', openPopupProfileWindow);
  }

  renderProfile() {
    this._titleElement.textContent = this._name;
    this._subtitleElement.textContent = this._description;
  }
}
