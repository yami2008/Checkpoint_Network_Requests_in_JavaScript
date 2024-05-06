const searchButton = document.getElementById('search');
let input = document.getElementById('ville') ;
let spanElement = document.getElementById('reponse') ;

input.oninput = function () {
    searchButton.disabled = input.value === "";
}

searchButton.onclick = async () => {
    // Verifier qu'on a bien mis le nom de la ville.
    if (input.value === ""){
        console.log("Champs vide") ;
        spanElement.style.color = "red" ;
        spanElement.innerHTML = "Error, Veuillez choisir une ville";
        return false ;
    }
    try {
        let result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=8d1c8bf5baa3f53b4fdd39f067c5b3f6`);
        let data = result.data ;
        spanElement.style.color = "black" ;
        spanElement.innerHTML = "" ;

        // Selection de l'icone en fonction de la temp
        if (data.main.temp - 273 >= 20){
            spanElement.innerHTML += `
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" style="fill: yellow;">
                    <path d="M6.995 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007-2.246-5.007-5.007-5.007S6.995 9.239 6.995 12zM11 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2H2zm17 0h3v2h-3zM5.637 19.778l-1.414-1.414 2.121-2.121 1.414 1.414zM16.242 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.344 7.759 4.223 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z"></path>
                </svg>`;
        }
        else{
            spanElement.innerHTML += `
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" style="fill: gray;">
                <path d="M18.944 11.112C18.507 7.67 15.56 5 12 5 9.244 5 6.85 6.611 5.757 9.15 3.609 9.792 2 11.82 2 14c0 2.757 2.243 5 5 5h11c2.206 0 4-1.794 4-4a4.01 4.01 0 0 0-3.056-3.888z"></path>
            </svg>` ;
        }

        // Affichage de la température.
        spanElement.innerHTML += "<br/>Il fait " + Math.floor(data.main.temp - 273) + "° à " + input.value;

        // Affichage de la description.
        spanElement.innerHTML += `<h1 class="mt-2">${data.weather[0].main}</h1>`;
        spanElement.innerHTML += `<p style="margin-top: -20px;">${data.weather[0].description}</p>`;

        // Affichage de la temp Min et Max.
        spanElement.innerHTML +=
        `<h3 class="mt-2" style="color: red">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style="fill: red">
                <path d="m10 10.414 4 4 5.707-5.707L22 11V5h-6l2.293 2.293L14 11.586l-4-4-7.707 7.707 1.414 1.414z"></path>
            </svg>
            Température Min ${Math.floor(data.main.temp_max - 273)}°
        </h3>`;

        spanElement.innerHTML +=
        `<h3 style="margin-top: -10px; color: blue">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style="fill: blue;">
                <path d="m14 9.586-4 4-6.293-6.293-1.414 1.414L10 16.414l4-4 4.293 4.293L16 19h6v-6l-2.293 2.293z"></path>
            </svg>
            Température Max ${Math.floor(data.main.temp_min - 273)}°
        </h3>`;

        // Affichage de la Pressure.
        spanElement.innerHTML +=
            `<h2>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);">
                    <path d="M11 19.91 10 22h4l-1-2.09c4-.65 7-5.28 7-9.91a8 8 0 0 0-16 0c0 4.63 3.08 9.26 7 9.91zm1-15.66v1.5A4.26 4.26 0 0 0 7.75 10h-1.5A5.76 5.76 0 0 1 12 4.25z"></path>
                </svg>
                Pression d'air : ${data.main.pressure}
            </h2>`;

        // Affichage de la humidity.
        spanElement.innerHTML +=
            `<h2>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);">
                    <path d="M12.6 2.4c-.4-.3-.9-.3-1.2 0C9.5 3.9 4 8.5 4 14c0 4.4 3.6 8 8 8s8-3.6 8-8c0-5.4-5.5-10.1-7.4-11.6"></path>
                </svg>
                Humidité : ${data.main.humidity}
            </h2>`;

        // Affichage du vent.
        spanElement.innerHTML +=
            `<h2>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);">
                    <path d="M13 5.5C13 3.57 11.43 2 9.5 2 7.466 2 6.25 3.525 6.25 5h2c0-.415.388-1 1.25-1 .827 0 1.5.673 1.5 1.5S10.327 7 9.5 7H2v2h7.5C11.43 9 13 7.43 13 5.5zm2.5 9.5H8v2h7.5c.827 0 1.5.673 1.5 1.5s-.673 1.5-1.5 1.5c-.862 0-1.25-.585-1.25-1h-2c0 1.475 1.216 3 3.25 3 1.93 0 3.5-1.57 3.5-3.5S17.43 15 15.5 15z"></path>
                    <path d="M18 5c-2.206 0-4 1.794-4 4h2c0-1.103.897-2 2-2s2 .897 2 2-.897 2-2 2H2v2h16c2.206 0 4-1.794 4-4s-1.794-4-4-4zM2 15h4v2H2z"></path>
                </svg>
                Vitesse du vent : ${data.wind.speed * 10} Km/h
            </h2>`;
    }
    catch (error){
        console.log(error) ;
        spanElement.style.color = "red" ;
        spanElement.innerHTML = "Error " + error.message;
    }
}