import {auth, firebase, db} from '../../../firebase'

const dataInicial = {
    loading: false,
    activo: false
}

const LOADING = 'LOADING'
const USER_EXITO = 'USER_EXITO'
const USER_ERROR = 'USER_ERROR'
const CERRAR_SESION = 'CERRAR_SESION'

export default function usuarioReducer (state = dataInicial, action){

    switch(action.type){
        case LOADING:
            return {...state, loading: true}
        case USER_ERROR:
            return {...dataInicial}
        case USER_EXITO:
            return {...state, loading: false, activo: true, user: action.payload.user}
        case CERRAR_SESION:
            return {...dataInicial}
        default: 
            return {...state}
    }

}

export const ingresarUsuarioGoogleAccion = () => async(dispatch) => {

    dispatch({
        type: LOADING
    })

    try {

        const provider = new firebase.auth.GoogleAuthProvider();
        const res = await auth.signInWithPopup(provider)

        console.log(res)
        

        dispatch({
            type: USER_EXITO,
            payload: {
                user: {
                    uid: res.user.uid,
                    email: res.user.email,
                    displayName: res.user.displayName
                }
            }
        })
        localStorage.setItem('usuario', JSON.stringify({
            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName
        }))

        await db.collection('usuarios').doc(res.user.email).set({
            email: res.user.email,
            uid: res.user.uid,
            displayName: res.user.displayName
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: USER_ERROR
        })
    }
}

export const ingresarUsuarioNormalAccion = (email, pass) => async(dispatch) => {

    dispatch({
        type: LOADING
    })

    try {

        const res = await auth.signInWithEmailAndPassword(email, pass);
        console.log(res.user);

        dispatch({
            type: USER_EXITO,
            payload: {
                user: {
                    uid: res.user.uid,
                    email: res.user.email,
                    displayName: res.user.displayName
                }
            }
        })
        localStorage.setItem('usuario', JSON.stringify({
            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName
        }))

        await db.collection('usuarios').doc(res.user.email).set({
            email: res.user.email,
            uid: res.user.uid,
            displayName: res.user.displayName
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: USER_ERROR
        })
    }
}

export const registrarUsuarioNormalAccion = (nombre, email, pass) => async(dispatch) => {

    dispatch({
        type: LOADING
    })

    try {

        await auth.createUserWithEmailAndPassword(email, pass).then((userFB) => {
            if (userFB.additionalUserInfo.isNewUser) {
                if (auth.currentUser) {
                    userFB.user.updateProfile({
                        displayName: nombre
                    }).then(() => {

                        dispatch({
                            type: USER_EXITO,
                            payload: {
                                user: {
                                    uid: userFB.user.uid,
                                    email: userFB.user.email,
                                    displayName: userFB.user.displayName
                                }
                            }
                        })

                        db.collection("usuarios").doc(userFB.user.email).set({

                            email: userFB.user.email,
                            uid: userFB.user.uid,
                            displayName: userFB.user.displayName
                        });
                        localStorage.setItem('usuario', JSON.stringify({
                            uid: userFB.user.uid,
                            email: userFB.user.email,
                            displayName: userFB.user.displayName
                        }))
                    }).catch(error => { console.log(error) })
                }
            }
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: USER_ERROR
        })
    }
}

export const ingresarPorRegistroAccion = () => async (dispatch, getState) => {

    const { user } = getState().usuario

    localStorage.setItem('usuario', JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
    }))

    dispatch({
        type: USER_EXITO,
        payload: {
            user: user
        }
    })
}


export const leerUsuarioAccion = () => async (dispatch) => {
    if(localStorage.getItem('usuario')){
        dispatch({
            type: USER_EXITO,
            payload: {
                user: JSON.parse(localStorage.getItem('usuario'))
            }
        })
    }
}

export const cerrarSesionAccion = () => (dispatch) => {
    auth.signOut()
    dispatch({
        type: CERRAR_SESION
    })
    localStorage.removeItem('usuario')
}