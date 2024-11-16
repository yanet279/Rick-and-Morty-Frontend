//Ahora te desafiamos a que crees un nuevo componente llamado Error. A este componente le podrás dar los estilos que quieras,
//pero la idea es que se muestre un mensaje de error 404. ¡Puedes inspirarte en este ejemplo!
// El desafío es el siguiente: haz que este componente se muestre cada vez que el usuario ingrese a cualquier otra ruta que no exista.
//Es decir que no la hayas especificado en esta homework. Por ejemplo, si creaste una ruta "/home" y "/about", y el usuario en el navegador escribe y "/henry", debería mostrar el componente Error 404.

const Error = () => {
  return (
    <div>
      <h1>ERROR 404</h1>
    </div>
  );
};
export default Error;
