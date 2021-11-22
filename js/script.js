/*
FILE NAME: script.js
ASSIGNMENT: Create a dynamic Multiplcation Table using JQuery
Kathy Le, UMass Lowell Computer Science, Kathy_Le@student.uml.edu, khle@cs.uml.edu
Copyright (c) 2021 by Kathy Le. All rights reserved. May be freely copied or excerpted    
for educational purposes with credit to the author. 
     
PROJECT DESCRIPTION:The goal of this program project assignment is to further
familiarize with HTML, CSS, and be introduced to JavaScript. In using those 
languages, we are to create a dynamic table of multiplication, asking for
ther user's input in four places. From the input, the table will be created
if the requirements are met. This requires the updates version using jQuery.
PROGRAM FILE GOAL: This file will dictate the behavior of the website and how to execute and create a dynamic table
*/

/*submit buttoon function to make sure it works*/
$("#submit").click(function(event){
    if($("#inputForm").valid()){
        $("#inputForm").submit()
    }
});

/*Let the user's know that there needs to be an input to make the table work and get created in all the variable/input requesting boxes*/
function validate(){
    $.validator.addMethod("greater", function (value, element, par){
        var i = parseInt(value)
        var j = parseInt($(par).val())
        return i >= j
    },
    "Error: Maximum has to be greater than the minimum value");

    $("#inputForm").validate({
        rules:{       
            minX:{
                range: [-50,50],
                required: true
            },

            maxX:{
                range: [-50,50],
                required: true,
                greater: $("minX")
            },

            minY:{
                range: [-50,50],
                required: true
            },

            maxY:{
                range: [-50,50],
                required: true,
                greater: $("minY")
            }
        },

        messages: {
            minX: {
                range: "Error! This is not in range.",
                required: "Error! Please assign a value within the range of -50 to 50 in the horizontal start to begin!"
            },

            maxX: {
                range: "Error! This is not in range.",
                required: "Error! Please assign a value within the range of -50 to 50 in the horizontal end to begin!"
            },

            minY: {
                range: "Error! This is not in range.",
                required: "Error! Please assign a value within the range of -50 to 50 in the vertical start to begin!"
            },

            maxY: {
                range: "Error! This is not in range.",
                required: "Error! Please assign a value within the range of -50 to 50 in the vertical end to begin!"
            }
        },

        submitHandler: function() {
            matrix();
            return false;
        },
        
        errorPlacement(error, element) {
            error.insertAfter(element.parent('div'));
        }
    });
}

function matrix(){

    /*This is to get the user's input and assign to the variables for later use*/
    var minY = Number(document.getElementById("minY").value);
    var maxY = Number(document.getElementById("maxY").value);
    var minX = Number(document.getElementById("minX").value);
    var maxX = Number(document.getElementById("maxX").value);

    /*This is to set-up a "reset" to the alerts by setting errors to false
    var elements = document.getElementsByClassName('alert');
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
    var error = false;*/

    /*If the input of the variable are below threshold, the users would get inputs for alert that they input is invalid
    if(minY < -50) {
        document.getElementById('minY').insertAdjacentHTML('afterend', '<div class = "alert alert-danger" role = "alert"> Error! This value is low.</div>');
        error = true;
    }
    if(maxY < -50) {
        document.getElementById('maxY').insertAdjacentHTML('afterend', '<div class = "alert alert-danger" role = "alert"> Error! This value is low.</div>');
        error = true;
    }
    if(minX < -50) {
        document.getElementById('minX').insertAdjacentHTML('afterend', '<div class = "alert alert-danger" role = "alert"> Error! This value is low.</div>');
        error = true;
    }
    if(maxX < -50) {
        document.getElementById('maxX').insertAdjacentHTML('afterend', '<div class = "alert alert-danger" role = "alert"> Error! This value is low.</div>');
        error = true;
    }*/

    /*If the user inputs numbers that are over the threshold, the users would be alert
    if(minY > 50) {
        document.getElementById('minY').insertAdjacentHTML('afterend', '<div class = "alert alert-danger" role = "alert"> Error! This value is high.</div>');
        error = true;
    }
    if(maxY > 50) {
        document.getElementById('maxY').insertAdjacentHTML('afterend', '<div class = "alert alert-danger" role = "alert"> Error! This value is high.</div>');
        error = true;
    }
    if(minX > 50) {
        document.getElementById('minX').insertAdjacentHTML('afterend', '<div class = "alert alert-danger" role = "alert"> Error! This value is high.</div>');
        error = true;
    }
    if(maxX > 50) {
        document.getElementById('maxX').insertAdjacentHTML('afterend', '<div class = "alert alert-danger" role = "alert"> Error! This value is high.</div>');
        error = true;
    }*/

    /*variable assigning starts here*/
    var curX = minY;
    var curY = minX;

    /*Making a table*/
    var table = document.createElement('table');
    table.classList.add('newTable');

    for (let i = 0; i <= (Math.abs(maxX - minX) + 1); i++){
        var row = document.createElement('tr');
        curX = minY;

        for(let j = 0; j <= (Math.abs(maxY - minY) + 1); j++){
            var col;

            if (i==0) {
                col = document.createElement('th');
            }
            else {
                col = document.createElement('td');
            }

            if ((i == 0) && (j == 0)){
                val = '';
                col.classList.add('firstCell');
            }
            else if(i == 0){
                val = curX;
                curX++;
                col.classList.add('firstRow');
            }
            else if(j == 0){
                val = curY;
                col.classList.add('firstCol');
            }
            else{
                val = curX * curY;
                curX++;
            }
            col.innerHTML = val;
            row.appendChild(col);
        }
        if(i != 0){
            curY++;
        }
        table.appendChild(row);
    }
    document.getElementById('dynMatrix').innerHTML = '';
    document.getElementById('dynMatrix').appendChild(table);
}