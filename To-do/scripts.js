
  const inputBox = document.getElementById("input-box");
  const taskList = document.getElementById("task-list");

  inputBox.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      addTask();
    }
  });

  function addTask() {
    const taskText = inputBox.value.trim();
    if (!taskText) return;

    const task = document.createElement("div");
    task.className = "task";

    task.innerHTML = `
    <div>
    <div class="task-header" onclick="this.nextElementSibling.classList.toggle('show')">
      <label><input type="checkbox"> ${taskText}</label>
      <button onclick="editTask(button)">Edit</button>
      <button onclick="this.closest('.task').remove()">Delete</button>
      
    </div>
    
    <div class="task-body">
      <label>Notes</label>
      <textarea placeholder="Write your notes..."></textarea>

      <label>Due Date</label>
      <input type="date">

      <label>Priority</label>
      <select>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      
    <div>
    </div>
  `;
   taskList.appendChild(task);
    inputBox.value = "";
    checkbox.addEventListener("change", function () {
    if (this.checked) {
      actionBar.style.display = "block";
    } else {
      actionBar.style.display = "none";
    }
});
  }
    function editTask(button) {
    const task = button.closest('.task');
    const label = task.querySelector('.task-header label');
    const input = label.querySelector('input[type="checkbox"]');
    const taskTextNode = label.childNodes[1];

    const currentText = taskTextNode.nodeValue.trim();
    const newText = prompt("Edit task:", currentText);

    if (newText !== null && newText.trim() !== "") {
      taskTextNode.nodeValue = " " + newText;
    }
}


   
  



 


