export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._countLikes = data.likes.length || 0;
    this._cardSelector = cardSelector;
    this._element = null;
    this._elementImage = null;
    this._elementTitle = null;
    this._elementLikeButton = null;
    this._elementLikesCount = null;

    this._elementRemove = null;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.photo')
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeToggle() {
    this._elementLikeButton.classList.toggle('photo__like-button_active');
  }

  _handlePhotoDelete() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._elementLikeButton.addEventListener('click', () => {this._handleLikeToggle()});
    this._elementRemove.addEventListener('click', () => {this._handlePhotoDelete()});
    this._elementImage.addEventListener('click', () => {this._handleCardClick(this._name, this._link)});
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementTitle = this._element.querySelector('.photo__title');
    this._elementLikeButton = this._element.querySelector('.photo__like-button');
    this._elementLikeCount = this._element.querySelector('.photo__like-count');
    this._elementRemove = this._element.querySelector('.photo__rm');
    this._elementImage = this._element.querySelector('.photo__img');

    this._elementTitle.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementLikeCount.textContent = this._countLikes;

    this._setEventListeners();

    return this._element;
  }
}
