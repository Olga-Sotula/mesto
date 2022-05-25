import { Card } from '../components/Card.js';

export default class Section {
  constructor(items, containerSelector) {
    this._initialArray = items;
    this._container = document.querySelector(containerSelector);

  }

  renderItems() {
    this._initialArray.forEach(data => {
      const card = new Card(data, '#photo-template', null);//handleCardClick
      const cardElement = card.generateCard();
      this.setItem(cardElement);
    });
  }

  setItem(element) {
    this._container.append(element);
  }
}
