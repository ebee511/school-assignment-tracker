// Variables
const assignmentName = document.getElementById("assignmentName");
const assignmentSubject = document.getElementById("subject");
const assignmentGrade = document.getElementById("assignment-grade");
const assignmentValue = document.getElementById("assignment-value");
const allAssignmentsDiv = document.getElementById("added-assignments");
const submitBtn = document.getElementById("submitBtn");
const engULUI = document.getElementById("eng-ul");
const mathULUI = document.getElementById("math-ul");
const sciULUI = document.getElementById("sci-ul");
const deleteAllBtn = document.getElementById("deleteAll");

// Event Listeners
window.addEventListener("DOMContentLoaded", getItemsFromLS);

submitBtn.addEventListener("click", function(e) {
  e.preventDefault();

  addAssignment();

  resetFields();
});

allAssignmentsDiv.addEventListener("click", deleteAssignment);

deleteAllBtn.addEventListener("click", deleteAllAssignments);

// Add Assignment function
function addAssignment() {
  const hwTitle = assignmentName.value;
  const hwSub = assignmentSubject.value;
  const hwGrade = assignmentGrade.value;
  const hwValue = assignmentValue.value;

  let rowUI = `
  <li>
    <p>${hwTitle}</p>
    <p>${hwGrade}/${hwValue}</p>
    <a>x</a>
  </li>
  `;

  if (hwSub === "eng") {
    engULUI.innerHTML += rowUI;
  } else if (hwSub === "sci") {
    sciULUI.innerHTML += rowUI;
  } else {
    mathULUI.innerHTML += rowUI;
  }

  const assignment = {
    title: hwTitle,
    subject: hwSub,
    grade: hwGrade,
    value: hwValue
  };

  addAssignmentToLS(assignment);
}

// Reset Input Fields function
function resetFields() {
  assignmentName.value = "";
  assignmentSubject.value = "";
  assignmentGrade.value = "";
  assignmentValue.value = "";
}

// Delete Single Assignment function
function deleteAssignment(e) {
  if (e.target.tagName == "A") {
    e.target.parentNode.remove();
    //Remove item from LS
    deleteFromLS(e.target.parentElement.firstElementChild.innerHTML);
  }
}

// Delete All Assignments function
function deleteAllAssignments() {
  // Deletes all HTML inside of subject sections
  engULUI.innerHTML = "";
  mathULUI.innerHTML = "";
  sciULUI.innerHTML = "";

  // Clears Local Storage
  clearLS();
}

//
// LOCAL STORAGE
//

// Get LS
function getItemsFromLS() {
  let assignments;

  // Check for local storage existance
  if (localStorage.getItem("assignments") === null) {
    assignments = [];
  } else {
    assignments = JSON.parse(localStorage.getItem("assignments"));
  }

  assignments.forEach(function(assignment) {
    let rowUI = `
      <li>
        <p>${assignment.title}</p>
        <p>${assignment.grade}/${assignment.value}</p>
        <a>x</a>
      </li>
      `;

    if (assignment.subject === "eng") {
      engULUI.innerHTML += rowUI;
    } else if (assignment.subject === "sci") {
      sciULUI.innerHTML += rowUI;
    } else {
      mathULUI.innerHTML += rowUI;
    }
  });
}

// Add Task To LS
function addAssignmentToLS(assignment) {
  let assignments;

  // Check for local storage existance
  if (localStorage.getItem("assignments") === null) {
    assignments = [];
  } else {
    assignments = JSON.parse(localStorage.getItem("assignments"));
  }

  assignments.push(assignment);
  localStorage.setItem("assignments", JSON.stringify(assignments));
}

// Delete Single Task from LS
function deleteFromLS(assignmentName) {
  let assignments;

  // Check for local storage existance
  if (localStorage.getItem("assignments") === null) {
    assignments = [];
  } else {
    assignments = JSON.parse(localStorage.getItem("assignments"));
  }

  // Pull the assignments array from LS, loop through each item and pass in index
  assignments.forEach(function(assignment, index) {
    // if the assignment name clicked to be removed, matches item being looped, remove it from array using the index
    if (assignmentName === assignment.title) {
      assignments.splice(index, 1);
    }

    // set the new LS storage array
    localStorage.setItem("assignments", JSON.stringify(assignments));
  });
}

// Clear All LS
function clearLS() {
  localStorage.clear();
}
