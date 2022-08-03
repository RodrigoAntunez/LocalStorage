// Variabnle
const listaTweets = document.querySelector('#lista-tweets');



//Event Listeners
eventListeners();

function eventListeners(){
    //Cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    //Borar tweet
    listaTweets.addEventListener('click', borrarTweet);

    //Cuando se carga la pagina
    document.addEventListener('DOMContentLoaded', localStorageListo);
}


//Functions

//Agregar tweet a la lista
function agregarTweet(e){
    e.preventDefault();
    //Leer el valor del textarea
    const tweet = document.querySelector('#tweet').value;
    //Crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';
    
    //Crear Elementos
    const li = document.createElement('li');
    li.innerText = tweet;
    //Agregar el boton de eliminar
    li.appendChild(botonBorrar);
    //Agregar el tweet a la lista
    listaTweets.appendChild(li);

    //Agregar al localStorage

    agregarTweetLocalStorage(tweet);
    
}

//eliminar tweet de la lista
function borrarTweet(e){
    e.preventDefault();
    if(e.target.classList.contains('borrar-tweet')){
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
}

// Agregar tweet a localStorage

function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    //Agregar el nuevo tweet
    tweets.push(tweet);
    //Convertir a string y agregarlo al localStorage
    localStorage.setItem('tweets', JSON.stringify(tweets));
    //agregar al localStorage

}

//Comprueba si hay elementos  en el localStorage
function obtenerTweetsLocalStorage(){
    let tweets;
    //Revisamos los valores de localStorage

    if(localStorage.getItem('tweets') === null){
        tweets = [];
    }else{
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}


//Mostrar los tweets de localStorage
function localStorageListo(){
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(function(tweet){
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';
    
        //Crear Elementos
        const li = document.createElement('li');
        li.innerText = tweet;
        //Agregar el boton de eliminar
        li.appendChild(botonBorrar);
        //Agregar el tweet a la lista
        listaTweets.appendChild(li);
        });
}

//Borrar tweet de localStorage
function borrarTweetLocalStorage(tweet){
    let tweets, tweetBorrar;
    //ELimina la X del tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1);
    //Obtenemos los tweets de localStorage
    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index){
        if(tweetBorrar === tweet){
            tweets.splice(index, 1);
        }
    });
    localStorage.setItem('tweets', JSON.stringify(tweets));
  }
