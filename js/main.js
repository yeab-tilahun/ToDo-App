
document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        displayFromLocalStorage()
    }
});
const addBtn = document.getElementById("button-addon2")
addBtn.addEventListener("click", () => {
    const task = document.getElementById("task_input").value
    // addToList(task)
    addToLocalStorage(task)
    displayFromLocalStorage()
    document.getElementById("task_input").value = ""

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
        const ID = generateIdForCheckBox()
        label.htmlFor = ID
        label.innerHTML = element

        input.type = "checkbox"
        input.classList.add("form-check-input")
        input.classList.add("me-1")
        input.id = ID
        input.value = element
        input.addEventListener("click", () => {
            removeTask(input.id)
        })

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
    if (data != null && data != "") {
        const taskArr = data.split(",")
        addToList(taskArr)
    } else {
        addToList(null)
    }

}
const displayCompletedFromLocalStorage = () => {
    const data = localStorage.getItem("Completed")
    if (data != null && data != "") {
        const taskArr = data.split(",")
        addToList(taskArr)
    } else {
        addToList(null)
    }

}


const generateIdForCheckBox = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

const removeTask = (id) => {
    const checkboxes = document.querySelectorAll(".me-1");
    const value = document.getElementById(id).value


    const data = localStorage.getItem("ToDoData")
    const taskArr = data.split(",")
    console.log(taskArr)
    const newArr = taskArr.filter((task) => task != value)
    console.log(newArr)


    localStorage.removeItem("ToDoData")
    localStorage.setItem("ToDoData", newArr)


    const preData = localStorage.getItem("Completed")
    const completed = []
    if (preData != null && preData != "") {
        completed.push(preData)
    }
    completed.push(taskArr.filter((task) => task == value))
    localStorage.setItem("Completed", completed)

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            checkbox.parentElement.remove();
        }
    });
}

const show = document.getElementById("show")
const inProgress = document.getElementById("inProgress")
const completed = document.getElementById("completed")

inProgress.addEventListener("click", () => {
    show.textContent = "In Progress "
    displayFromLocalStorage()
})

completed.addEventListener("click", () => {
    show.textContent = "Completed"
    displayCompletedFromLocalStorage()
})


