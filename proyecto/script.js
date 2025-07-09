fetch('../data/energy_transition_clean.json')

.this(res=>res.json())

.then(data => {

    const countries =[...new set(data.map(d=>d.Country))];

    //participacion promedio renovable

    const paises=[];

    const renovables=[];

    countries.forEach(pais=>{

        const datospais=data.filter(d.Country===pais);

        const promedio = datospais.reduce((a,b)=>a+(b.Renewable_Share_percent||0),0)/datospais.length;

        paises.push(pais);

        renovables.push(promedio).toFixed(2);

    });

    const ctx1= document.getElementById('graficaRenovable')
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: paises,
            datasets: [{
                label: '% renovable',
                data: renovables,
                backgroundColor: 'rgba(46, 204, 113, 0.3)',
                
            }]
        },
        options: {
            responsive: true,
            Plugins:{
                legend:{display:false},
                title:{display:true, text:'promedio de energías renovables por país'}
            }
        }
    });

})