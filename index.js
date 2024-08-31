const { log } = require('console');
const express = require('express')
const { writeFile, readFile } = require('fs');
const app = express()

const path = "./todos.json"


//READ
app.get('/', function (req, res) {
    readFile(path, "utf8", (error, data) => {
        if (error) {
          console.log(error);
          return;
        }

        const parsedData = JSON.parse(data);
        let string = parsedData + "<a href='#'>Hello GET</a>";
        res.send(string)
    });
})

//CREATE
app.post('/', function (req, res) {
    
    readFile(path, "utf8", (error, data) => {
        
        if (error) {
          console.log(error);
          return;
        }
        
        const parsedData = JSON.parse(data);
        parsedData.push(req.query);

        writeFile(path, JSON.stringify(parsedData,null,2), function (err) {
            if (err) throw err;
            res.send(`<a href='#'>Hello POST</a>`);
        });
    });
})

//UPDATE
app.put('/', function (req, res) {
    readFile(path, "utf8", (error, data) => {
        
        if (error) {
          console.log(error);
          return;
        }
        
        let parsedData = JSON.parse(data);

        parsedData = parsedData.map(todoItem => 
            todoItem.task === req.query.task ? { ...todoItem, completed: "true" } : todoItem
        );

        writeFile(path, JSON.stringify(parsedData,null,2), function (err) {
            if (err) throw err;
            res.send(`<a href='#'>Hello PUT</a>`);
        });
    });
})

//DELETE
app.delete('/', function (req, res) {
    readFile(path, "utf8", (error, data) => {
        
        if (error) {
          console.log(error);
          return;
        }
        
        let parsedData = JSON.parse(data);

        parsedData = parsedData.filter(todoItem => 
            todoItem.task != req.query.task
        );

        writeFile(path, JSON.stringify(parsedData,null,2), function (err) {
            if (err) throw err;
            res.send(`<a href='#'>Hello DELETE</a>`);
        });
    });
})

app.listen(3000)