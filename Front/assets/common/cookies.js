// Funcion para almacenar la cookie
export function crear(token){
    document.cookie = "sessionStorage="+token+" ; max-age=3600; path=/";

}

// Funcion para eliminar la cookie
export function eliminar(){

    document.cookie = "sessionStorage=;max-age=0;path=/";
 
    window.location.reload();

}