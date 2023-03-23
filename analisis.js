//encuentra la persona en salarios

const encontrarPersona = (nombrePersona) => salarios.find(persona => persona.name === nombrePersona);

// aceder a trabajo

function trabajoPersona(nombrePersona){
     const trabajos = encontrarPersona(nombrePersona).trabajos;
     const salarios = trabajos.map(function (elemento){
        return elemento.salario;

     });
    const calcularMedian = PlatziMath.calcularMediana(salarios);
    return calcularMedian;
    };

function proyeccionPorPersona(nombrePersona){
    const trabajos = encontrarPersona(nombrePersona).trabajos;

    let porcentajesCrecimiento = [];

    for (let i = 1; i < trabajos.length; i++){
        const salarioActual = trabajos[i].salario;
        const salarioPasado = trabajos[i - 1].salario;
        const crecimiento = salarioActual - salarioPasado;
        const porcentajeCrecimiento = crecimiento / salarioPasado;
        porcentajesCrecimiento.push(porcentajeCrecimiento);
    }

    const medianaPorcentajesCremiento = PlatziMath.calcularMediana(porcentajesCrecimiento);
    
    const ultimoSalario = trabajos[trabajos.length - 1].salario;
    const aumetoSalario =  ultimoSalario * medianaPorcentajesCremiento;
    const nuevoSalario = aumetoSalario + ultimoSalario;
    return nuevoSalario;    
}    

const empresas = {};
for (persona of salarios){
    for (trabajo of persona.trabajos){
        if(!empresas[trabajo.empresa]){
            empresas[trabajo.empresa]={};
        }
        if (!empresas[trabajo.empresa][trabajo.year]){
            empresas[trabajo.empresa][trabajo.year] = [];
        }
        empresas[trabajo.empresa][trabajo.year].push(trabajo.salario);
    }
    
}
console.log({empresas});

function medianaEmpresa(nombre, year){
    if(!empresas[nombre]){
        console.warn("la empresa no existe");}
     else if(!empresas[nombre][year]){
        console.warn("la empresa no dio salarios ese año")
     } else {
        return PlatziMath.calcularMediana(empresas[nombre][year]);  
     }   
    }

    function proyeccionPorEmpresa(nombre){
        if(!empresas[nombre]){
            console.warn("la empresa no existe");}
        else{
            const empresaYears = Object.keys(empresas[nombre]);
            const listaMedianaYears = empresaYears.map((year)=>{
                return medianaEmpresa(nombre, year); 
            });
            let porcentajesCrecimiento = [];

            for (let i = 1; i < listaMedianaYears.length; i++){
                const salarioActual = listaMedianaYears[i];
                const salarioPasado = listaMedianaYears[i - 1];
                const crecimiento = salarioActual - salarioPasado;
                const porcentajeCrecimiento = crecimiento / salarioPasado;
                porcentajesCrecimiento.push(porcentajeCrecimiento);
            }
            
            const medianaPorcentajesCremiento = PlatziMath.calcularMediana(porcentajesCrecimiento);

                    
            const ultimaMediana = listaMedianaYears[listaMedianaYears.length - 1];
            const aumeto =  ultimaMediana * medianaPorcentajesCremiento;
            const nuevoMediana = aumeto + ultimaMediana;
            return nuevoMediana; 

    }}


    function medianaGeneral(){
        const listaDeMediana = salarios.map( persona => trabajoPersona(persona.name));
        console.log({nombres});
        const mediana = PlatziMath.calcularMediana(listaDeMediana);
        return mediana; 
    }   

    function medianaTop10 () {
        const listaMedianas = salarios.map(persona => trabajoPersona(persona.name)
        );
        const medianasOrdenadas = PlatziMath.ordenarLista(listaMedianas)
        
        const cantidad = listaMedianas.length / 10;
        const limite = listaMedianas.length - cantidad;

        const top10 = medianasOrdenadas.slice(limite, medianasOrdenadas.length);
        console.log({medianasOrdenadas, top10   });
        const medianaTop10 = PlatziMath.calcularMediana(top10);
        return medianaTop10;
    }




