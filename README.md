# Memo App

Aplicacion movil creada para  [Proyecto Final, Grupo QUACK](https://www.intec.edu.do) en React Native 0.60

## Tabla de contenidos

- [Instrucciones de configuracion](#Instrucciones-de-configuracion)
- [Instrucciones de instalación](#Instrucciones-de-instalación)
- [Instrucciones de operacion](#Instrucciones-de-operacion)
- [Estructura de archivos y directorios](#Estructura-de-archivos-y-directorios)
- [Changelog](#changelog)
- [Contacto](#Contacto)

# Instrucciones de configuración

## Prerrequisitos
- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [React Native](https://facebook.github.io/react-native/)
- [ESlint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Yarn Package Manager](https://yarnpkg.com/en/)
- [Node version Manager](https://github.com/creationix/nvm)

## Instrucciones

1. Clonar el proyecto en un directorio, con el siguiente comando.

```sh
$ git clone
```

2. Correr el comando **yarn install** dentro del directorio del proyecto para instalar todas las dependencias.

```sh
$ yarn install
```

# Instrucciones de instalación


## Entorno de producción
1. Tener un dispositivo iOS/Android
2. Buscar en el nombre de la app "Memo" en App Store/Google Play 
3. Instalar en el dispositivo movil

## Entorno de desarrollo
1. Tener un dispositivo/Simulador iOS/Android
2. Tener la aplicacion *Expo* instalada en nuestro dispositivo/simulador



# Instrucciones de operación

1. Correr el comando **yarn start** dentro del directorio del proyecto para inicializar el servidor de expo, el cual alojara nuestro servidor local para poder comunicarse con la app.


```sh
$ yarn start 
```

2. Asegurarse de encontrarse en el mismo entorno de red, para que sea posible la comunicacion del servidor y la app.

3. Abrir la app de expo en nuestro dispositivo movil e ir al tab de *Projects* y seleccionar el servidor que esta corriendo en nuestra red. Generalmente lleva el nombre de nuestro dispositivo.

4. La app iniciara en cuanto termine de cargar todos las dependencias necesarias para que corra nuestra aplicacion.


## **Correr Redux Devtools**

1. Se necesita tener instalado la aplicacion [React Native Debugger](https://github.com/jhen0409/react-native-debugger) en nuestra maquina que vamos a usar para desarrollar o testear.

2. Correr la app en modo de debug

3. Abrir el archivo de configuracion de la aplicacion  [React Native Debugger] y colocar el numero de puerto en el que es usado el modo debug de la aplicacion.

   - Look something like this in the config file:
  ```sh
    // RNDebugger will open debugger window with the ports when app launched
    defaultRNPackagerPorts: [YOUR_PORT_NUMBER],
  ```

4. Verificar que no hay otro tab o debugger abierto

5. Reiniciar la aplicacion (React Native Debugger).

6. Refrescar la aplicacion.


# Estructura de archivos y directorios

```
/App
  /Components
    /NonReusableComponent1
    /NonReusableComponent2
    /NonReusableComponent3
    /Common
      /ReusableComponent1
      /ReusableComponent2
      /ReusableComponent3
  /Screens
    /Screen1
    /Screen12
    /Screen13
  /Core
    /Theme
  /Redux
    /Common
```

# Copyright

La reproducción, adaptación o transición de este producto por parte de terceros sin permiso escrito previo de la organización MEMO está completamente prohibido.

MEMO no hace representaciones ni garantías, ya sean expresas o implícitas, por o con respecto a cualquier cosa en este documento, y no será responsable de ninguna garantía implícita de comerciabilidad o adecuación para un propósito particular o por ningún daño indirecto, especial o consecuente.

# Contacto

Para cualquier duda se puede comunicar via correo electronico a memostudentapp@gmail.com

# Changelog

Release notes:

- [1.0.0](https://docs.google.com/document/d/1-iJrKZQLSGSOBNvlalW9tsI7nNbIhQBKuhJIQzTApdA/edit?usp=sharing)