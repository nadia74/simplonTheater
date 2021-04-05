const prompt = require("prompt-sync")(); //fonction Node permettant de récupérer la saisie console de l'utilisateur

//créer l'affichage de la salle en fonction des valeurs booléennes récupérées dans le tableau à 2D passé en paramètre
function displayRoom(arr) {
  for (let i = 0; i < 8; i++) {
    let line;
    line = i + " | ";
    for (let j = 0; j <= 8; j++) {
      if (arr[i][j] === true) {
        line = line + " * ";
      } else line = line + "(_)";
    }
    console.log(line);
  }
  let lastLine = "     ";
  for (let k = 0; k <= 8; k++) {
    lastLine = lastLine + k + "  ";
  }
  console.log(lastLine);
}

// Vérifier les places disponibles sur la rangée demandée et, s'il y a assez place, modifier la valeur booléenne des places à réserver
function verifyAvailability(row, places, arr) {
  let count = 0;
  let available = false;

  for (let i = 0; i <= 8; i++) {
    if (arr[row][i] == true) {
      count++;
    }
  }

  if (count + places <= 9) {
    available = true;
  }
  return available;
}

//Confirme à l'utilisateur que sa demande est confirmée ou lui propose de réserver sur d'autres rangées en affichant la salle
function validateRequest(row, places, arr, available) {
  if (available == false) {
    console.log(
      `Il n'y a pas assez de places sur la rangée pour ${places} personnes. Veuillez choisir une autre rangée sur le plan`
    );
    displayRoom(arr);
    whatDoYouWant(arr);
  } else {
    for (let i = 0; i < 9; i++) {
      if (arr[row][i] == false) {
        for (let j = 0; j < places; j++) {
          arr[row][i + j] = true;
        }
        break;
      }
    }
    console.log(`${places} places ont été réservées sur la rangée n°${row}`);
    //console.log(arr);
  }
  displayRoom(arr);
  wantMorePlaces(arr);
}
//Après la confirmation de la réservation, propose de procéder à d'autres réservation, ou de quitter l'application
function wantMorePlaces(arr) {
  var otherOrder = prompt("Voulez-vous réserver d'autres places ? Y/N ");
  if (otherOrder === "Y" || otherOrder === "y") {
    whatDoYouWant(arr);
  } else if (otherOrder === "N" || otherOrder === "n") {
    console.log(
      "Merci pour votre réservation, à bientôt dans les salles Simplon Theater !\n  _      _      _\n>(.)__ <(.)__ =(.)_\n (___/  (___/  (___/ \n"
    );
    return 0;
  } else {
    console.log(
      "Je n'ai pas comprit votre réponse, veuillez répondre en tapant Y pour oui ou N pour non sur votre clavier"
    );
    wantMorePlaces(arr);
  }
  return arr;
}

//Demande à l'utilisateur ce qu'il souhaite réserver, avec vérifications des entrées clavier.
function whatDoYouWant(arr) {
  var places = prompt("Combien de places voulez-vous réserver ?  ");
  places = parseInt(places);

  if (places > 0 && places <= 9 && Number.isInteger(places) === true) {
    console.log(`Vous voulez acheter ${places} places`);
    var row = prompt("A quelle rangée voulez-vous aller ?  ");

    row = parseInt(row);
    if (row >= 0 && row < 8 && Number.isInteger(places) === true) {
      console.log(`Vous voulez aller à la rangée n° ${row}`);
      let available = verifyAvailability(row, places, arr);
      validateRequest(row, places, arr, available);
    } else {
      console.log(row);
      console.log("Veuillez entrer un numéro de rangée entre 0 et 7 ");
      whatDoYouWant(arr);
    }
  } else {
    console.log("Veuillez entrer un nombre de places entre 1 et 9");
    whatDoYouWant(arr);
  }
}

var arr = new Array();
for (let i = 0; i <= 7; i++) {
  arr[i] = new Array(8);
}

for (let j = 0; j <= 7; j++) {
  for (let k = 0; k <= 8; k++) {
    arr[j][k] = false;
  }
}
whatDoYouWant(arr);
