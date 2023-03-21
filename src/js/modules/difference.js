export default class Difference {
    constructor(oldOfficer, newOfficer, items) {
        this.oldOfficer = document.querySelector(oldOfficer);
        this.newOfficer = document.querySelector(newOfficer);
        this.oldItems = this.oldOfficer.querySelectorAll(items);
        this.newItems = this.newOfficer.querySelectorAll(items);
        this.items = items;
        this.oldCounter = 0;
        this.newCounter = 0;
    }

    bindTriggers() {

        [
            {officer: this.oldOfficer, items: this.oldItems, counter: this.oldCounter},
            {officer: this.newOfficer, items: this.newItems, counter: this.newCounter}
        ].forEach(({officer, items, counter}) => {
            officer.querySelector('.plus').addEventListener('click', () => {
                if (counter !== items.length - 2) {
                    items[counter].style.display = 'flex';
                    counter++;
                } else {
                    items[counter].style.display = 'flex';
                    items[items.length - 1].remove();
                }
            });
        })
    }

    hideItems() {

        [this.oldItems, this.newItems].forEach(items => {
            items.forEach((item, i, arr) => {
                if (i !== arr.length - 1) {
                    item.style.display = 'none';
                }
            });
        })
    };

    init() {
        this.hideItems();
        this.bindTriggers();
    }
}