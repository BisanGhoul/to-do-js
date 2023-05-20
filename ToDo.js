const prompt = require('prompt-sync')();
function Task(){

}

Task.prototype = {
    description: "",
    id: null,
    dueDate: new Date(),
    priority: 0,
    isDone: false,
    toString: function() {
      return ("ID: " + this.id + "\nDue Date: " + this.dueDate + "\nPriority: " + this.priority + "\n" +(this.isDone == false? "Not Completed" : "Completed") + "\nDescription: " + this.description);
    }
  };

let task = new Task();
task.toString();
 let maxId = 0;


function addTask(taskList){
    let desc = prompt('Enter Task Description: ');
    const dateString = prompt('Enter due date (yyyy-mm-dd): ');
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    let priority = prompt('Enter Task Priority ');

    let t=new Task();
    t.id=++maxId;
    t.description=desc;
    t.dueDate=date;
    t.priority=priority;
    t.isDone=false;

    taskList.push(t);
}

function markAsDone(taskList){
    let valid = false;
    let id = prompt('Enter Task ID to mark as done: ');
    do{
    
    if(id != null && id <= maxId){
        let task = taskList.find( item => item.id==id);
        if(typeof task !== undefined){
            task.isDone=true;
            valid = true;
        }else{
            console.log("There is no task with this ID!");
        }
    }else{
        console.log("Invalid Task ID! Try again..");
        id = prompt('Enter Task ID to mark as done: ');
    }
    
    }while(!valid);
}

function deleteTask(taskList){
    let valid = false;
    let id = prompt('Enter Task ID to delete: ');
    do{
    if(id != null && id <= maxId )
    {
        const index = taskList.findIndex(task => task.id == id);
        if (index !== -1) {
            taskList.splice(index, 1);
            console.log("Task deleted successfully.");
            valid = true;
        } else {
            console.log("There is no task with this ID!");
        }
    }else{
        console.log("ID is invalid! Try again..");
        id = prompt('Enter Task ID: ');
        
    }
} while(!valid);
    return taskList;
}

function listTasks(taskList){
    console.log("\n\n========================= Tasks =========================");
    if(taskList.length==0){
        console.log("\n No Tasks");
    }else{
    taskList.forEach(task => {
        console.log(task.toString() + "\n---------------------------\n");
    });}
}

function listCompletedTasks(taskList) {
    console.log("\n\n========================= Completed Tasks =========================");
    if(taskList.length==0){
        console.log("\n No Tasks");
    }else{
    taskList.forEach(task => {
        task.isDone ? console.log(task.toString() + "\n---------------------------\n") : null;
    });
}
}

function deleteAllTasks(taskList) {
    taskList.splice(0, taskList.length);
    console.log("All tasks have been deleted.");
}

function sortBasedOnDate(taskList){
    taskList.sort((a, b) => a.dueDate - (b.dueDate));
    listTasks( taskList );
}

function sortBasedOnPriority(taskList){
    taskList.sort((a, b) => a.priority - (b.priority));
    listTasks( taskList );
}

function main(){
    let taskList = [];
   let msg = `
   ***************************
   Welcome to JS TODO-APP
   ***************************
   Select an action:
   1) Add a new task
   2) List all tasks
   3) List completed tasks
   4) Mark the task as done
   5) Delete a task
   6) Sort tasks by the due date
   7) Sort tasks by priority
   8) Clear all tasks
   9) exit...
   ***************************
   What's your choice?`;


   let userInput = 0;

   while (userInput !== 9) {
       userInput = parseInt(prompt(msg));

       switch (userInput) {
           case 1:
               addTask(taskList);
               break;
           case 2:
            listTasks(taskList);
               break;
           case 3:
               listCompletedTasks(taskList);
               break;
            case 4:
                markAsDone(taskList);
                break;
             case 5:
                deleteTask(taskList);
                    break;
            case 6:
                sortBasedOnDate(taskList);
               break;

               case 7:
                sortBasedOnPriority(taskList);
                break;
                case 8:
                    deleteAllTasks(taskList);
                    break;
           case 9:
               console.log("Exiting...");
               break;
           default:
               console.log("Invalid option. Please try again.");
               break;
       }
    //console.log(taskList);
}
}

main();