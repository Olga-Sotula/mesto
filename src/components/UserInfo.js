export default class UserInfo {
  constructor(selectors) {
    this._titleElement = document.querySelector(selectors.title);
    this._subtitleElement = document.querySelector(selectors.subtitle);
    this._avatarElement = document.querySelector(selectors.avatar);
  }

  setId(id){
    this._id = id;
  }

  getId() {
    return this._id;
  }

  setAvatar(link) {
    this._avatarElement.src = link;
  }

  getUserInfo() {
    return {name: this._titleElement.textContent, description: this._subtitleElement.textContent};
  }

  setProfile(data) {
    this._titleElement.textContent = data.name;
    this._subtitleElement.textContent = data.description;
  }

  setInfo(info) {
    this.setId(info._id);
    this.setProfile({name: info.name, description: info.about});
    this.setAvatar(info.avatar);
  }
}
