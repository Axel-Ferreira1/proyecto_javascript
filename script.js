const students = [];
let editingIndex = -1; 

document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    
    document.getElementById("errorName").textContent = "";
    document.getElementById("errorLastName").textContent = "";
    document.getElementById("errorGrade").textContent = "";

    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastname").value.trim();
    const grade = parseFloat(document.getElementById("grade").value);

    let valid = true;

    if (!name){
        document.getElementById("errorName").textContent= "Debes colocar un nombre";
        valid = false;
    }

    if (!lastName){
        document.getElementById("errorLastName").textContent= "Debes colocar un apellido";
        valid= false;
    }

    if (isNaN(grade) || grade < 1 || grade > 7) {
        document.getElementById("errorGrade").textContent= "La nota debe ser entre 1 y 7";
        valid= false;
    }

    if (!valid) return;

    const student={name,lastName,grade};
    
    if (editingIndex=== -1) {
        
        students.push(student);
    } else {
        
        students[editingIndex]= student;
        editingIndex= -1; 
        document.querySelector("button[type='submit']").textContent= "Guardar";
    }

    updateTable();
    calcularPromedio();
    this.reset();
});

const tableBody= document.querySelector("#studentTable tbody");

function updateTable(){
    tableBody.innerHTML= '';
    students.forEach((student, index)=>{
        const row= document.createElement("tr");
        row.innerHTML= `
            <td>${student.name}</td>
            <td>${student.lastName}</td>
            <td>${student.grade}</td>
            <td>
                <button class="btn-delete">Eliminar</button>
                <button class="btn-edit">Editar</button>
            </td>
        `;
        
        row.querySelector(".btn-delete").addEventListener("click", function() {
            borrarEstudiante(index);
        });
        
        row.querySelector(".btn-edit").addEventListener("click", function() {
            editarEstudiante(index);
        });
        
        tableBody.appendChild(row);
    });
}

function borrarEstudiante(index) {
    students.splice(index, 1);
    updateTable();
    calcularPromedio();
}

function editarEstudiante(index) {
    const student= students[index];
    document.getElementById("name").value= student.name;
    document.getElementById("lastname").value= student.lastName;
    document.getElementById("grade").value= student.grade;
    editingIndex=index;
    document.querySelector("button[type='submit']").textContent= "Guardar";
}

const promDiv=document.getElementById("average");

function calcularPromedio() {
    if (students.length=== 0) {
        promDiv.innerHTML="Promedio General del curso: N/A";
        return;
    }
    const total=students.reduce((acc, student)=>acc+student.grade, 0);
    const average=total/students.length;
    promDiv.innerHTML=`Promedio General del curso:${average.toFixed(2)}`;
}

updateTable();