document.addEventListener("DOMContentLoaded", function () {

    const canvas = document.getElementById("signature");

    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext("2d");

    let dessin = false;

    // =====================================================
    // CONFIGURATION DU CANVAS
    // =====================================================

    function ajusterCanvas() {

        const rect = canvas.getBoundingClientRect();

        const ratio = window.devicePixelRatio || 1;

        canvas.width = rect.width * ratio;
        canvas.height = 200 * ratio;

        canvas.style.height = "200px";

        ctx.scale(ratio, ratio);

        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "#000";
    }

    ajusterCanvas();


    // =====================================================
    // POSITION DE LA SOURIS
    // =====================================================

    function positionSouris(e) {

        const rect = canvas.getBoundingClientRect();

        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }


    // =====================================================
    // POSITION DU DOIGT
    // =====================================================

    function positionTactile(e) {

        const rect = canvas.getBoundingClientRect();

        const touch = e.touches[0];

        return {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top
        };
    }


    // =====================================================
    // COMMENCER LA SIGNATURE - SOURIS
    // =====================================================

    canvas.addEventListener("mousedown", function (e) {

        dessin = true;

        const pos = positionSouris(e);

        ctx.beginPath();

        ctx.moveTo(pos.x, pos.y);
    });


    // =====================================================
    // DESSINER - SOURIS
    // =====================================================

    canvas.addEventListener("mousemove", function (e) {

        if (!dessin) return;

        const pos = positionSouris(e);

        ctx.lineTo(pos.x, pos.y);

        ctx.stroke();
    });


    // =====================================================
    // TERMINER - SOURIS
    // =====================================================

    canvas.addEventListener("mouseup", function () {

        dessin = false;

        sauvegarderSignature();
    });


    canvas.addEventListener("mouseleave", function () {

        if (dessin) {

            dessin = false;

            sauvegarderSignature();
        }

    });


    // =====================================================
    // COMMENCER LA SIGNATURE - TÉLÉPHONE
    // =====================================================

    canvas.addEventListener(
        "touchstart",
        function (e) {

            e.preventDefault();

            dessin = true;

            const pos = positionTactile(e);

            ctx.beginPath();

            ctx.moveTo(pos.x, pos.y);

        },
        { passive: false }
    );


    // =====================================================
    // DESSINER - TÉLÉPHONE
    // =====================================================

    canvas.addEventListener(
        "touchmove",
        function (e) {

            e.preventDefault();

            if (!dessin) return;

            const pos = positionTactile(e);

            ctx.lineTo(pos.x, pos.y);

            ctx.stroke();

        },
        { passive: false }
    );


    // =====================================================
    // TERMINER - TÉLÉPHONE
    // =====================================================

    canvas.addEventListener(
        "touchend",
        function (e) {

            e.preventDefault();

            dessin = false;

            sauvegarderSignature();

        },
        { passive: false }
    );


    canvas.addEventListener(
        "touchcancel",
        function () {

            dessin = false;

            sauvegarderSignature();

        }
    );


    // =====================================================
    // SAUVEGARDER LA SIGNATURE
    // =====================================================

    function sauvegarderSignature() {

        const signatureData =
            document.getElementById("signatureData");

        if (!signatureData) return;

        signatureData.value =
            canvas.toDataURL("image/png");
    }


    // =====================================================
    // EFFACER LA SIGNATURE
    // =====================================================

    window.effacerSignature = function () {

        const rect = canvas.getBoundingClientRect();

        ctx.clearRect(
            0,
            0,
            rect.width,
            rect.height
        );

        const signatureData =
            document.getElementById("signatureData");

        if (signatureData) {

            signatureData.value = "";

        }

    };


    // =====================================================
    // REDIMENSIONNEMENT
    // =====================================================

    window.addEventListener("resize", function () {

        // On ne redimensionne pas automatiquement
        // après qu'une signature a été commencée.

        if (!dessin) {

            ajusterCanvas();

        }

    });

});
