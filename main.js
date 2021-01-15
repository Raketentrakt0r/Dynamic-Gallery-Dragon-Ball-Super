var grid = new Muuri('.grid', {
    layout: {           
        rounding: false 
    }
});

window.addEventListener('load', () => { 
    grid.refreshItems().layout(); 
    document.getElementById('grid').classList.add('img-loaded');


    const links = document.querySelectorAll('#category a') 
    links.forEach((element) => { 
        element.addEventListener('click', (e) => {
            e.preventDefault(); 
            links.forEach( (link) => link.classList.remove('active')); 
            e.target.classList.add('active') 
            
            //Filtrado por category (universe)

            const category = e.target.innerHTML.toLowerCase(); 
            category === 'all' ? grid.filter('[data-category]') : 
            grid.filter(`[data-category="${category}"]`); 

        });
    });


    //Listener para la barra de busqueda "searcher"
    document.querySelector('#searcher').addEventListener('input', (e) => {
        const search = e.target.value;
        grid.filter( (item) => item.getElement().dataset.tags.includes(search));
    });

    
   //Ciclo para recorrer todas las imagenes y su descripcion
    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach((element) => {
        const path = element.getAttribute('src');
        const description = element.parentNode.parentNode.dataset.description;

         //listener de las imagenes para mostrar el overlay

    element.addEventListener('click', () =>{
        const path = element.getAttribute('src');  
        const description = element.parentNode.parentNode.dataset.description;

        overlay.classList.add('active');
        document.querySelector('#overlay img').src = path;
        document.querySelector('#overlay .description').innerHTML = description;



        });

    });
 /* para cerrar la imagen desde la X */
    document.querySelector('#btn-close-popup').addEventListener('click', ()=> {
        overlay.classList.remove('active');
    })

    overlay.addEventListener('click', (e) => {
    
        e.target.id === 'overlay' ? overlay.classList.remove('active') :  '';

    })
});