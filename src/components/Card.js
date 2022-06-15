export class Card {
  constructor(data, cardSelector, handleCardClick, handleCardLike, handleCardDelete) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes || [];
    this._ownerId = data.owner._id;
    this._deleteEnabled = false;
    this._cardSelector = cardSelector;
    this._element = null;
    this._elementImage = null;
    this._elementTitle = null;
    this._elementLikeButton = null;
    this._elementLikesCount = null;
    this._elementRemove = null;

    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleCardDelete = handleCardDelete;
  }

  getId() {
    return this._id;
  }

   _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.photo')
      .cloneNode(true);

    return cardElement;
  }

  isUserLiked(userId) {
    return this._likes.some((item) => userId === item._id);
  }

  _renderLikes(userId) {
    this._elementLikeCount.textContent = this._likes.length;
    if (this.isUserLiked(userId)) {
      this._elementLikeButton.classList.add('photo__like-button_active');
    } else {
      this._elementLikeButton.classList.remove('photo__like-button_active');
    }
  }

  _setEventListeners() {
    this._elementLikeButton.addEventListener('click', () => {
      //this._handleLikeToggle()
      this._handleCardLike(this)
    });
    this._elementRemove.addEventListener('click', () => {
      this._handleCardDelete(this._element, this._id)
    });
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }

  generateCard(userId) {
    this._deleteEnabled = (this._ownerId === userId);
    this._element = this._getTemplate();
    this._elementTitle = this._element.querySelector('.photo__title');
    this._elementLikeButton = this._element.querySelector('.photo__like-button');
    this._elementLikeCount = this._element.querySelector('.photo__like-count');
    this._elementRemove = this._element.querySelector('.photo__rm');
    this._elementImage = this._element.querySelector('.photo__img');

    this._elementTitle.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._renderLikes(userId);
    this._elementRemove.hidden = !this._deleteEnabled;
    this._elementRemove.disabled = !this._deleteEnabled;

    this._setEventListeners();

    return this._element;
  }

  updateLikes(likes, userId) {
    this._likes = likes || [];
    this._renderLikes(userId);
  }
}
