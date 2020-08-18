import {
  define,
} from "wicked-elements";
import { lockScreen, unlockScreen } from "../framework/lock-screen";

define(
  // a unique, specific, CSS selector that will become wicked
  '[data-component="navigation"]',
  {
      init() {
        this.navigationOpen = false;
      },
      connected() {
        this.burger = this.element.querySelector("[data-component='navigationBurger']")
        this.mainNavigation = this.element.querySelector("[data-component='mainNavigation']")
      },
      onToggleNavigation(event) {
        this.navigationOpen = !this.navigationOpen;
        this.burger.navigationOpen = this.navigationOpen;

        if (this.navigationOpen) {
            this.element.classList.add('is-open')
        } else {
            this.element.classList.add('is-open')
        }
      }
  }
);

define(
    // a unique, specific, CSS selector that will become wicked
    '[data-component="navigationBurger"]',
    {
        onClick(event) {
            this.element.dispatchEvent(new CustomEvent("toggleNavigation", {bubbles: true}))
        }
    }
  );
