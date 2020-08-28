import { define } from "wicked-elements";

define('[data-component="toggler"]', {
    init() {
      this.expanded = this.element.classList.contains('is-open');
  
      this.applyExpandedState();
    },
    applyExpandedState(){
      let button = this.element
      if (!(this.element instanceof HTMLButtonElement)) {
        button = this.element.querySelector('button');
        if (!button) {
          console.warn('all item togglers should have a button', this.element)
          return;
        }
      }
  
      button.setAttribute('aria-expanded', this.expanded)
    },
    onClick(event) {
      this.expanded = !this.expanded;
      this.element.classList.toggle("is-open", this.expanded);
      this.applyExpandedState();
    },
  });
  