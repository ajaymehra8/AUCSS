// Hide existing toast (if any)
const hideToast = () => {
  const el = document.querySelector(".alert");
  if (el) {
    el.classList.remove("show"); // Trigger slide up animation
    // Wait for transition to finish before removing
    setTimeout(() => {
      el.parentElement && el.parentElement.removeChild(el);
    }, 500); // Matches the CSS transition time
  }
};

// type is 'success' or 'error'
const toast = (obj) => {
  let { type, title, time } = obj;

  if (!type) type = "error";
  if (!title) title = "No message provided";
  if (!time) time = 5000;

  // Hide any existing toast before showing a new one
  hideToast();

  // Create the markup for the toast
  const markup = `<div class="alert alert--${type}">${title}</div>`;

  // Add the markup to the body
  document.body.insertAdjacentHTML("afterbegin", markup);

  // Add show class after a tiny delay to trigger transition
  setTimeout(() => {
    const el = document.querySelector(".alert");
    if (el) el.classList.add("show");
  }, 10); // A short delay allows the DOM to render first

  // Hide the toast after the specified time
  setTimeout(hideToast, time);
};

export default toast;
