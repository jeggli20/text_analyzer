//* ==================== Constants ====================
const TEXTAREA = document.querySelector(".text");
const BUTTON = document.querySelector(".btn");

//* ==================== Functions ====================
// Function that removes spaces from char array
function removeSpaces(array) {
  let newArray = [];

  for (let i = 0; i < array.length; i++) {
    if (array[i] === " ") {
      continue;
    } else {
      newArray.push(array[i]);
    }
  }

  return newArray;
}

// Function that converts string to an array of chars
// - Trims whitespace from either end
// - Converts all letter to lowercase
// - Put string into an array
function stringToArray(string) {
  let array = string.trim().toLowerCase().split("");
  let removed = removeSpaces(array);

  return removed;
}

// Function that gets unique chars in an array of chars
function uniqueChars(array) {
  let uniqueArray = [...new Set(array)];

  return uniqueArray;
}

// Function that sorts an array of chars alphabetically
function alphabetically(array) {
  return array.sort();
}

// Function that analyzes text
function analyze(string) {
  let array = stringToArray(string);
  let unique = uniqueChars(array);
  let sorted = unique.sort();

  let analysis = [];

  for (let i = 0; i < sorted.length; i++) {
    analysis.push([sorted[i], 0]);
    for (let j = 0; j < array.length; j++) {
      if (array[j] === sorted[i]) {
        analysis[i][1]++;
      }
    }
  }

  return analysis;
}

// Function that creates a list
function list(array) {
  let listItems = [];

  for (let i = 0; i < array.length; i++) {
    listItems[i] =
      "<li class='listItem'>" + array[i][0] + " - " + array[i][1] + "</li>";
  }

  let list = "<ul class='list'>" + listItems.join("") + "</ul>";

  return list;
}

// Function that returns the HTML for a textarea
function textarea() {
  return "<textarea class='text' placeholder='Add your text here...'></textarea>";
}

// Function that changes the button
function btnChange() {
  $(".btn").toggleClass("submit result");
  if ($(".btn").hasClass("submit")) {
    console.log("submit");
    $(".btn").text("Analyze");
  } else {
    console.log("result");
    $(".btn").text("New Text");
  }
}

// Function that changes the content on the page
function contentChange(array) {
  if ($(".btn").hasClass("submit")) {
    $(".text").replaceWith(list(array));
  } else {
    $(".list").replaceWith(textarea());
  }
}

//* ==================== Events ====================
BUTTON.addEventListener(
  "click",
  () => {
    let analysis = analyze(TEXTAREA.value);
    contentChange(analysis);
    btnChange();
  },
  false
);
