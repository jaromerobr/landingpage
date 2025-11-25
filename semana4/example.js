let arrayGatos = [];
let editIndex = -1;

const loadGatos = () => {
    const stored = localStorage.getItem('gatos');
    if (stored) {
        arrayGatos = JSON.parse(stored);
    } else {
        arrayGatos = [
            {
                nombre: "Michi",
                raza: "Siames",
                edad: 2,
                color: "Blanco con negro",
            },
        ];
        saveGatos();
    }
};

const saveGatos = () => {
    localStorage.setItem('gatos', JSON.stringify(arrayGatos));
};

const sendRegister = (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const raza = document.getElementById("raza").value;
    const edad = document.getElementById("edad").value; 
    const color = document.getElementById("color").value;

    if (editIndex !== -1) {
        arrayGatos[editIndex] = {
            nombre: nombre,
            raza: raza,
            edad: edad,
            color: color,
        };
        editIndex = -1;
        document.querySelector("form input[type='submit']").value = "Registrar Mascota";
    } else {
        arrayGatos.push({
            nombre: nombre,
            raza: raza,
            edad: edad,
            color: color,
        });
    }

    saveGatos();
    console.log("Gatos guardados:", arrayGatos);
    document.querySelector("form").reset();
    buildTable();
};

const buildTable = () => {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";

    arrayGatos.forEach((gato, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${gato.nombre}</td>
            <td>${gato.raza}</td>
            <td>${gato.edad}</td>
            <td>${gato.color}</td>
            <td>
                <button onclick="editGato(${index})">Editar</button>
                <button onclick="deleteGato(${index})">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

const deleteGato = (index) => {
    arrayGatos.splice(index, 1);
    saveGatos();
    console.log(arrayGatos);
    buildTable();
}

const editGato = (index) => {
    const gato = arrayGatos[index];
    document.getElementById("nombre").value = gato.nombre;
    document.getElementById("raza").value = gato.raza;
    document.getElementById("edad").value = gato.edad;
    document.getElementById("color").value = gato.color;
    
    editIndex = index;
    document.querySelector("form input[type='submit']").value = "Actualizar Mascota";
}

loadGatos();
buildTable();