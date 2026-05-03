
let vulnerabilidades =JSON.parse(localStorage.getItem("vulns")) || [];
let contadorid = vulnerabilidades.length > 0
? Math.max(...vulnerabilidades.map(v => v.id)) +1 : 1;
let ideditanto = null; 
    renderTabla();

document.getElementById("form-vuln").addEventListener("submit", function(e){
    e.preventDefault();

    if(ideditanto !== null){

        let index = vulnerabilidades.findIndex(function(v){
            return v.id === ideditanto;
        });

        vulnerabilidades[index].nombre=document.getElementById("nombre").value;
        vulnerabilidades[index].url=document.getElementById("url").value;
        vulnerabilidades[index].tipo=document.getElementById("tipo-vulnr").value;
        vulnerabilidades[index].severidad=document.getElementById("severidad").value;
        vulnerabilidades[index].estado=document.getElementById("estado").value;
        vulnerabilidades[index].descripcion=document.getElementById("descripcion").value;

            ideditanto = null;
    }else{
            let nueva={

        id: contadorid++,
        nombre: document.getElementById("nombre").value,
        url:  document.getElementById("url").value,
        tipo: document.getElementById("tipo-vulnr").value,
        severidad: document.getElementById("severidad").value,
        estado: document.getElementById("estado").value,
        descripcion: document.getElementById("descripcion").value
    };

    vulnerabilidades.push(nueva);
    }

        renderTabla();
    guardar();
        this.reset();
});

function renderTabla(){
 
    let cuerpo = document.getElementById("cuerpo-tabla");
    cuerpo.innerHTML="";

    vulnerabilidades.forEach(function(vuln){

        let fila =document.createElement("tr");
        
        fila.innerHTML=`
        
        <td>${vuln.nombre}</td>
        <td>${vuln.tipo}</td>
        <td>${vuln.severidad}</td>
        <td>${vuln.url}</td>
        <td>${vuln.estado}</td>
        <td>${vuln.descripcion}</td>
        
        <td> 
        <button class="btn-eliminar" onclick="eliminar(${vuln.id})">Eliminar</button>
        <button class="btn-editar" onclick="editar(${vuln.id})">Editar</button>
        </td>
        `

        cuerpo.appendChild(fila);
    });
}

 function eliminar (id){

        vulnerabilidades=vulnerabilidades.filter(function(vuln){
            return vuln.id !==id;
        });

        renderTabla();
        guardar();
 };

function editar(id){

    let vuln = vulnerabilidades.find(function(v){
        return v.id === id;
    });

    document.getElementById("nombre").value=vuln.nombre;
    document.getElementById("url").value=vuln.url;
    document.getElementById("tipo-vulnr").value=vuln.tipo;
    document.getElementById("severidad").value=vuln.severidad;
    document.getElementById("estado").value=vuln.estado;
    document.getElementById("descripcion").value=vuln.descripcion;

    ideditanto = id ;
}

//para guardar los registros 

function guardar(){

    localStorage.setItem("vulns", JSON.stringify(vulnerabilidades));
}

