const moment = require("moment")
const Todo = require("../models/Todo");

const homeController = async (req, res, next)=> {
    try{
        const todos = await Todo.find({});
        res.locals.moment = moment;
        res.render("index",{title: "List todo", todos: todos});
    }catch(err) {
        res.status(500).json({message: err.message})
    }
}

const addTodoFormController = (req,res,next)=>{
    try{
        res.render("newTodo", {title: "Add todo"})
    }catch(err) {
        res.status(500).json({message: err.message})
    }
}

const updateTodoPageController = async(req,res,next)=>{
    try{
        const {id} = req.query;
        const todo = await Todo.findById(id);


        res.render("updateTodo", {title: "Update todo", todo});
    }catch(err) {
        res.status(500).json({message: err.message})
    }
}

const deleteTodoPageController = (req,res,next)=>{
    try{
        const {id} = req.query;

        res.render("deleteTodo", {title: "Delete todo", id});
    }catch(err) {
        res.status(500).json({message: err.message})
    }
}

const addTodoController = async (req,res,next)=>{
    try{
        const {title, desc} = req.body;
        const newTodo = new Todo({title, desc});
        await newTodo.save();
        res.redirect("/");
    }catch(err) {
        res.status(500).json({message: err.message})
    }
}

const updateTodoController = async(req, res, next) => {
    try {
        const {id} = req.params;
        const {title, desc} = req.body;

        const todo = await Todo.findById(id);
        if(!todo) {
            res.status(404).json({message: "Todo not found"});
        }
        todo.title = title;
        todo.desc = desc;
        await todo.save();

        res.redirect("/");
    }catch(err) {
        res.status(500).json({message: err.message})
    }
}

const deleteTodoController =  async(req, res, next) => {
    try {
        const {id, confirm} = req.query;
        if(confirm==="yes") {
            await Todo.findByIdAndDelete(id);
        }

        res.redirect("/");
    }catch(err) {
        res.status(500).json({message: err.message})
    }
}

module.exports ={
    homeController,
    addTodoFormController,
    updateTodoPageController,
    deleteTodoPageController,
    addTodoController,
    updateTodoController,
    deleteTodoController
}