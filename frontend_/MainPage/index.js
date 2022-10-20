const url = "http://localhost:3000/task";
let list = document.getElementsByClassName("todo_ul")[0];
list.innerHTML = 'getting...'
// LOGGER //
const logger = (data) => {
  let list = document.getElementsByClassName("todo_ul")[0];
  list.innerHTML = "";
  if (data.length == 0) {
    list.innerHTML = "chala jaa bsdk";
    return;
  }
  data.forEach((item) => {
    list.innerHTML += `<li>${item.data}
<i onclick="deleteTask(${item.id})" class="fa fa-trash" aria-hidden="true"></i>
<i onclick="editTask(${item.id})"  class="fa fa-pencil" aria-hidden="true"></i>
</li>`;
  });
};

// GET //
fetch(url, { headers: { "Access-Control-Allow-Origin": "*" } })
  .then((res) => res.json())
  .then((data) => { 
    logger(data);
  })
  .catch((err) => {
     console.log(err)
     let list = document.getElementsByClassName("todo_ul")[0];
     list.innerHTML = err
});

let submit = document.getElementById("add");
let inputval = document.getElementsByTagName("input")[0];

// POST //
submit.addEventListener("click", (e) => {
  e.preventDefault();
  const data = inputval.value;
  if (data != "") {
    inputval.value = "";
    const newData = {data: data };
    
    fetch(url, {
      method: "POST",
      body: JSON.stringify(newData),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    })
    .then((res) => res.json())
      .then((data) => {
        logger(data);
      })
      .catch((err) => console.log(err));
    } else alert("please enter text");
  });
  
  // DELETE //
  function deleteTask(id) {
    fetch(`${url}/${id}`, { method: "DELETE" })
    .then((res) => res.json())
    .then((data) => {
      logger(data);
    })
    .catch((err) => console.log(err));
  }

// DELETE ALL //
let deleteAll = document.getElementById("deleteAll");
deleteAll.addEventListener('click',()=>{
  fetch(`${url}`, { method: "DELETE" })
  .then((res) => res.json())
  .then((data) => {
    console.log("data frontend ; ",data);
    logger(data);
  })
  .catch((err) => console.log(err));
})
// UPDATE //
let edit_form = document.getElementsByClassName("edit_popup")[0];
let save = document.getElementById("saveChange");
let Cancel = document.getElementById("CancelChange");
let textarea = document.getElementById("textarea");

let ID = null;
function editTask(id) {
  edit_form.style.display = "flex";
  ID = id;
}

Cancel.addEventListener('click',()=>{
     edit_form.style.display = "none";
     textarea.value = "";
})

save.addEventListener("click", () => {
  edit_form.style.display = "none";
  const val = textarea.value;
  textarea.value = "";
  const newData = { id: ID, data: val };
  fetch(`${url}/${ID}`, {
    method: "PUT",
    body: JSON.stringify(newData),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      logger(data);
    })
    .catch((err) => console.log(err));
});