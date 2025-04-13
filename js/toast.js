// Hide existing toast (if any)
const hideToast = () => {
    const el = document.querySelector(".alert");
    if (el) el.parentElement.removeChild(el);
  };
  
  // type is 'success' or 'error'
  const toast = (obj) => {
    console.log("working");
    let { type, title, time } = obj;
  
    if (!type) {
      type = "error";
    }
    if (!title) {
      title = "No message provided";
    }
    if (!time) {
      time = 5000;
    }
  
    // Hide any existing toast before showing a new one
    hideToast();
  
    // Create the markup for the toast
    const markup = `<div class="alert alert--${type}">${title}</div>`;
  
    // Add the markup to the body
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  
    // Hide the toast after the specified time
    setTimeout(hideToast, time);
  };
  
  // Export the functions at the end
  module.exports = { toast };
  