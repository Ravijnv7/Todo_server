const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const port= 3000;
app.use(bodyParser.json());

let todos=[];

function findIndex(arr, id) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id == id) return i;
    }
    return -1;
  }

function removeIndex(arr,index){
    let newArray=[];
    for(let i=0;i<arr.length;i++){
        if(i!=index){
            newArray.push(arr[i]);
        }
    }
    return newArray;
}

app.post('/todos',(req,res)=>{
    const newTodo={
        id:Math.floor(Math.random()*100000),
        title:req.body.title,
        description:req.body.description

    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
})

app.put('/todos/:id',(req,res)=>{
    const todoIndex=findIndex(todos,parseInt(req.params.id));
    if(todoIndex== -1){
        res.status(404).send();
    }
    else{
        todos[todoIndex].title= req.body.title;
        todos[todoIndex].description.req.body.description;
        res.json(todos[todoIndex]);
    }
});
app.get('/todos/:id',(req,res)=>{
    console.log(todos);
    console.log(req.params.id);
    console.log(typeof(req.params.id));
    console.log(typeof(parseInt(req.params.id)));
    const todoIndex=findIndex(todos,parseInt(req.params.id));
    console.log(todoIndex)
    if(todoIndex== -1){
        res.status(404).send();
    }
    else{
        res.json(todos[todoIndex]);
    }
})



app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  app.get('/todos', (req, res) => {
    res.json(todos);
  });
  
  app.delete('/todos/:id',(req,res)=>{
    const todoIndex= findIndex(todos,parseInt(req.params.id));
    if(todoIndex===-1){
        res.status(404).send();
    }
    else{
        todos= removeIndex(todos,todoIndex);
        res.status(200).send();
    }
    
  })









app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})

