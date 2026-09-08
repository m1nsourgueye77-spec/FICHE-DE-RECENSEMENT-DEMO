function genererQRCode(numero, taille = 180) {

    const zone = document.getElementById("qrcode");

    if (!zone) {
        return;
    }

    zone.innerHTML = "";

    if (!numero) {

        console.error(
            "Aucun numéro d'adhérent pour générer le QR Code."
        );

        return;
    }

    new QRCode(zone, {

        text: numero,

        width: taille,

        height: taille,

        correctLevel:
            QRCode.CorrectLevel.H

    });
}
