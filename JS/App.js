var btnSesion = document.getElementById('btnSesion');
var btnLogout = document.getElementById('btnLogout');
var txtDisplayName = document.getElementById('txtDisplayName');
var txtDisplayEmail = document.getElementById('txtDisplayEmail');
var btnSave = document.getElementById('btnSave');
var refDataBase = firebase.database().ref('usuario');

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log('tenemos usuario');
        mostrarInformacionPerfil('*/*/(Uid)*/*/')
    } else {
        Console.log('No existe');
    }
});

function mostrarInformacionPerfil(uid) {
    refDataBase.child(uid).once('value', function(data) {
        txtDisplayName.value = data.val().displayName;
        txtDisplayEmail.value = data.val().email;
    })
};

btnSave.addEventListener('click', function() {
    event.preventDefault();
    var usuario = {
        DisplayName: txtDisplayName.value,
        email: txtDisplayName.value,
        uid: datosUsuario.user.uid
    }
    refDataBase.child('/*/*(Uid)/*/*/').update(usuario);
    /*refDataBase.set(usuario).then(function() {
        alert('registro almacenado')
    }).catch(function(error) {
        alert('Error: ' + error);
    })
    alert("Registro almacenado");*/
});

btnSesion.addEventListener('click', function() {
    abrirsesion();
    event.preventDefault();
    //var provider = new firebase.auth.GoogleAuthProvider();
    //provider.addScope('https://www.googleapis.com/auth/contacts/readonly')
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('public_profile')
    firebase.auth().signInWithPopu(provider).then(function(datosUsuario) {
        var usuario = {
            DisplayName: datosUsuario.user.displayName,
            email: datosUsuario.user.email,
            uid: datosUsuario.user.uid
        }
        refDataBase.push(usuario);
    });
});

btnLogout.addEventListener('click', function() {
    cerrarSesion();
    firebase.auth().singOut().then(function() {
        alert('Sesion finalizada')
    })
});

function abrirsesion() {
    btnSesion.style.display = 'none';
    btnLogout.style.display = 'block';
};

function cerrarSesion() {
    btnSesion.style.display = 'block';
    btnLogout.style.display = 'none';
};