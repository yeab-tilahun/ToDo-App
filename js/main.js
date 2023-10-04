
const addBtn = document.getElementById("button-addon2")
addBtn.addEventListener("click", () => {
    const task = document.getElementById("task_input").value
    // addToList(task)
    addToLocalStorage(task)
    displayFromLocalStorage()

})

const list = document.getElementById("list")

const addToList = (data) => {
    const ul = document.getElementById("list")
    const h6 = document.getElementById("empty_msg")
    ul.innerHTML = "";
    if (data == null) {
        h6.textContent = "No task for today :)"
        return
    }
    h6.textContent = ""
    data.forEach(element => {
        const li = document.createElement("li")
        const input = document.createElement("input")
        const label = document.createElement("label")
        label.classList.add("form-check-label")
        label.htmlFor = "firstCheckbox"
        label.innerHTML = element

        input.type = "checkbox"
        input.classList.add("form-check-input")
        input.classList.add("me-1")
        input.id = "firstCheckbox"

        li.classList.add("list-group-item")

        li.appendChild(input)
        li.appendChild(label)
        ul.appendChild(li)
    });
}

const addToLocalStorage = (task) => {
    const taskArr = []
    const data = localStorage.getItem("ToDoData")
    if (data) {
        taskArr.push(data)
        localStorage.removeItem("ToDoData")
    }
    taskArr.push(task)
    localStorage.setItem("ToDoData", taskArr)
}

const displayFromLocalStorage = () => {
    const data = localStorage.getItem("ToDoData")
    if (data != null) {
        const taskArr = data.split(",")
        addToList(taskArr)
    } else {
        addToList(null)
    }

}
displayFromLocalStorage()