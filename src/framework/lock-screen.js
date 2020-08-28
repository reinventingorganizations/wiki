const htmlElement = document.documentElement;
const bodyElement = document.body;
let scrollTop;
let isLocked = false;

export function lockScreen() {
  if (isLocked) {
    return;
  }

  const windowHeight = window.innerHeight;
  scrollTop = window.scrollY;
  isLocked = true;

  htmlElement.style.height = `${windowHeight}px`;
  htmlElement.style.overflow = 'hidden';
  bodyElement.style.height = `${windowHeight + scrollTop}px`;
  bodyElement.style.overflow = 'hidden';
  bodyElement.style.marginTop = `-${scrollTop}px`;
}

export function unlockScreen() {
  if (isLocked) {
    htmlElement.removeAttribute('style');
    bodyElement.removeAttribute('style');
    window.scrollTo(0, scrollTop);
    isLocked = false;
  }
}
