const modalAdd = document.querySelector(".add-task");
const inputTaskName = document.getElementById("task-name");
const inputTaskStatus = document.getElementById("task-status");
const buttonRemoveTask = document.getElementById("remove-task");
const editSaveBtn = document.getElementById("update-button");
const saveBtn = document.getElementById("submit-button");
const newTaskBtn = document.getElementById("new-task");

const listTaskName = localStorage.getItem("task-name")
  ? JSON.parse(localStorage.getItem("task-name"))
  : [];
const listTaskStatus = localStorage.getItem("task-status")
  ? JSON.parse(localStorage.getItem("task-status"))
  : [];

modalAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputTaskName.value.length < 1) {
    document.querySelector(".warning-input").style.display = "block";
    setTimeout(() => {
      document.querySelector(".warning-input").style.display = "none";
    }, 2000);
  } else if (inputTaskStatus.value.length < 1) {
    document.querySelector(".warning-select").style.display = "block";
    setTimeout(() => {
      document.querySelector(".warning-select").style.display = "none";
    }, 2000);
  } else {
    addTaskName();
    addTaskStatus();
    location.reload()
  }
});

buttonRemoveTask.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

function addTaskName() {
  listTaskName.push(inputTaskName.value);
  localStorage.setItem("task-name", JSON.stringify(listTaskName));
}

function addTaskStatus() {
  listTaskStatus.push(inputTaskStatus.value);
  localStorage.setItem("task-status", JSON.stringify(listTaskStatus));
}

function deleteTask(i) {
  listTaskName.splice(i, 1);
  listTaskStatus.splice(i, 1);
  localStorage.setItem("task-name", JSON.stringify(listTaskName));
  localStorage.setItem("task-status", JSON.stringify(listTaskStatus));
  location.reload();
}

function updateTask(i) {
  editSaveBtn.addEventListener("click", () => {
    if (inputTaskName.value.length < 1) {
      document.querySelector(".warning-input").style.display = "block";
      setTimeout(() => {
        document.querySelector(".warning-input").style.display = "none";
      }, 2000);
    } else if (inputTaskStatus.value.length < 1) {
      document.querySelector(".warning-select").style.display = "block";
      setTimeout(() => {
        document.querySelector(".warning-select").style.display = "none";
      }, 2000);
    } else {
      listTaskName.splice([i], 1, inputTaskName.value);
      listTaskStatus.splice([i], 1, inputTaskStatus.value);
      localStorage.setItem("task-name", JSON.stringify(listTaskName));
      localStorage.setItem("task-status", JSON.stringify(listTaskStatus));
      location.reload();
    }
  });
}

function displayItems() {
  let items = "";
  for (let i = 0; i < listTaskName.length && listTaskStatus.length; i++) {
    items += `            
    <tr>
    <th scope="row">${[i + 1]}</th>
    <td>${listTaskName[i]}</td>
    <td>
      <span class="status-${listTaskStatus[i]}">${listTaskStatus[i]}</span>
    </td>
    <td>
      <button
        type="button"
        style="padding: 0.5rem"
        class="btn btn-outline-primary btn-sm d-flex"
        id="edit-button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          class="bi bi-pencil-square"
          viewBox="0 0 16 16"
        >
          <path
            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
          />
          <path
            fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
          />
        </svg>
      </button>
    </td>
    <td>
      <button
        type="button"
        style="padding: 0.5rem"
        class="btn btn-outline-danger btn-sm d-flex"
        id="delete-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          class="bi bi-trash"
          viewBox="0 0 16 16"
        >
          <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
          />
          <path
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
          />
        </svg>
      </button>
    </td>
  </tr>`;
  }
  document.querySelector(".table-body").innerHTML = items;
  activeDeleteListener();
  activeUpdateListener();
}

function activeDeleteListener() {
  let deleteBtn = document.querySelectorAll("#delete-button");
  deleteBtn.forEach((dB, i) => {
    dB.addEventListener("click", () => {
      deleteTask(i);
    });
  });
}

function activeUpdateListener() {
  const updateBtn = document.querySelectorAll("#edit-button");
  updateBtn.forEach((uB, i) => {
    uB.addEventListener("click", () => {
      saveBtn.style.display = "none";
      editSaveBtn.style.display = "block";
      inputTaskName.value = listTaskName[i];
      inputTaskStatus.value = listTaskStatus[i];
      updateTask(i);
    });
  });
}

newTaskBtn.onclick = () => {
  editSaveBtn.style.display = "none";
  saveBtn.style.display = "block";
  inputTaskName.value = "";
  inputTaskStatus.value = "";
};

window.onload = () => {
  displayItems();
};
