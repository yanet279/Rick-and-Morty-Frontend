// esta funcion esta apartada y esta dentro de la carpeta form por ser especial para form y para modularizar
//tiene que validar username y password
// EMAIL=>>
// el nombre de usuario tiene que ser un email (¡Explora validaciónes REGEX en internet!)./// //^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
// el nombre de usuario no puede estar vacío.
// el nombre de usuario no puede tener más de 35 caracteres.
// PASSWORD=>>
// la contraseña tiene que tener al menos un número.
// la contraseña tiene que tener una longitud entre 6 y 10 caracteres.
//EL VALIDADOR NO PUEDE MODIFICAR LA DATA

import { UserData, Errors } from "../../Models/interfaces"

const validation = ( userData: UserData, errors: Errors, setErrors: React.Dispatch<React.SetStateAction<Errors>>) => {
	// creo la funcion y le paso  userdata, errors (del estado que acabo de crear)y el setErrosrs
	//=>> que es la funcion del usestate de errors  x arg porque es lo que busco validar
	//validacion del username :

	if (!userData.username) {
		return setErrors({
			...errors,
			username: 'Por favor completa este campo',
		});
	}
	if (userData.username.length > 35) {
		return setErrors({
			...errors,
			username: 'No puede superar los 35 caracteres',
		});
	}

	if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{3})+$/.test(userData.username)) {
		return setErrors({ ...errors, username: 'email invalido' });
	}

	setErrors({ ...errors, username: '' });

	//validacion de password :
	//     la contraseña tiene que tener al menos un número.
	// la contraseña tiene que tener una longitud entre 6 y 10 caracteres.

	// if (!/^(?=.*\d).{6,10}$/.test(userData.password)) {
	// 	return setErrors({ ...errors, password: 'debe tener al menos un numero' });
	// }
	if (userData.password.length < 6 || userData.password.length > 10) {
		return setErrors({
			...errors,
			password: 'Debe tener entre 6 y 10 caracteres',
		});
	}
	if (!/\d/.test(userData.password)) {
		return setErrors({ ...errors, password: 'Debe tener al menos un numero' });
	}
	return setErrors({ ...errors, password: '' });
};
export default validation;
