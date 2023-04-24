//* ==================== Functions ====================
// Function that converts string to an array of chars
function stringToArray(string) {
  let array = string
    .trim() // Trim whitespace form either end
    .replace(/[^A-Za-z\s]/g, "") // Remove punctuation and numbers
    .replace(/\s/g, "") // Remove spaces between words
    .toUpperCase() // Convert all letters to uppercase
    .split(""); // Put each character in a different array position

  return array;
}

// Function that gets unique chars in an array of chars
function uniqueChars(array) {
  let uniqueArray = [...new Set(array)];

  return uniqueArray;
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

// Function that creates a table
function table(array) {
  let tableHeaders =
    "<tr><th class='table-header'>Letter</th><th class='table-header'># Of Occurrences</th></tr>";
  let tableRows = [];

  for (let i = 0; i < array.length; i++) {
    tableRows[i] =
      "<tr class='table-row'><td class='table-item'>" +
      array[i][0] +
      "</td><td class='table-item'>" +
      array[i][1] +
      "</td></tr>";
  }

  let table =
    "<div class='table'><table>" +
    tableHeaders +
    tableRows.join("") +
    "</table></div>";

  return table;
}

// Function that returns the HTML for a textarea
function textarea() {
  return "<textarea class='text' placeholder='Add your text here...'></textarea>";
}

// Function that changes the button
function btnChange() {
  $(".btn").toggleClass("submit result");
  if ($(".btn").hasClass("submit")) {
    $(".btn").text("Analyze");
  } else {
    $(".btn").text("New Text");
  }
}

// Function that changes the content on the page
function contentChange(array) {
  if ($(".btn").hasClass("submit")) {
    $(".text").replaceWith(table(array));
  } else {
    $(".table").replaceWith(textarea());
  }
}

//* ==================== Events ====================
$(".btn").click(() => {
  let analysis;

  if ($(".btn").hasClass("submit")) {
    let textValue = $(".text").val();
    analysis = analyze(textValue);
  }

  contentChange(analysis);
  btnChange();
});
