
  const inputBox = document.getElementById("input-box");
  const taskList = document.getElementById("task-list");

  inputBox.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      addTask();
    }
  });

  function addTask() {
    const taskText = inputBox.value.trim();
    if (!taskText) {
      alert("please write down the task");
      return;
    };

    const task = document.createElement("div");
    task.className = "task";

    task.innerHTML = `
    <div onclick="this.nextElementSibling.classList.toggle('show')">
    <div class="task-header" onclick="this.nextElementSibling.classList.toggle('show')">
      <label><input type="checkbox"> ${taskText}</label> 
      
      <span class="arrow">&#9660;</span>
          
    </div>
    
    <div class="task-body">
      <label>Notes</label>
      <textarea placeholder="Write your notes..."></textarea>

      <label>Due Date</label>
      <input id="dt" type="date"><br>

      <label>Priority</label>
      <select>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      
      <button onclick="this.closest('.task').remove()">Delete</button>

      
    <div>
    </div>

    
  `;
  
  taskList.appendChild(task);
  inputBox.value = "";
    
  checkbox.addEventListener("click", function (){
  taskList.classList.toggle("completed", checkbox.checked);
    
    
  });
  function clearAllTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = ""; // This clears all tasks
}
  
}
   


   
  



 


