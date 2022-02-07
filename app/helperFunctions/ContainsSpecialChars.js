import React from "react";

// THis function is used to ensure that the user does not enter any special characters
function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }

  export default containsSpecialChars;