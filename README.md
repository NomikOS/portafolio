# Portafolio node.js, php ,laravel, vue.js, vuetify de Igor Parra

- Ninguno de los códigos incluidos en este repo es ejecutable, son sólo retazos de aquí y de allá para mostrar estilo y estructuras.

## Vue.js y vuetify

- El directorio pwa contiene una muestra parcial de una aplicación de tipo progressive web application. Usa vuex para manejo de estados y axios para llamadas a api.

## Microservicio en php lumen/laravel

- El directorio ms contiene una muestra parcial de una aplicación de tipo microservicio api hecha con lumen, que es un subconjunto de laravel.

## Backends en node.js

- El directorio api contiene una muestra parcial de una aplicación de tipo api hecha con node.js.

- En general este modelo de backend es el que uso siempre para apis o workers en node.js. Lo he ido afinando a traves del tiempo. Es muy flexible y eficiente.
  - Usa un modulo propio `module-koa-common` que tengo en un repo privado. En este caso lo incluyo como dependencia local.
- Se usa koa.js para usar async/await out of the box. 
- Se usa estructura [CLEAN](https://www.freecodecamp.org/news/a-quick-introduction-to-clean-architecture-990c014448d2/) (interpretación propia suceptible de mejorar):
  - application: Casos de uso:
    - PoisAll: Para vista inicial sin requerimeientos de entrada.
    - PoisSector: Para vistas sectorizadas dado un centro geográfico. Se requiren distancia, coordenadas del cetro y eventualmente categorias.
  - infrastructure: Rutas de la api y librerias 
    - container: Configura clases mediante injección de dependecias usando [Awilix](https://www.npmjs.com/package/awilix)
    - httpServer: Implementación de server HTTP usando middlewares koa.js
  - init.js: Inicialización de server.
  - interfaces: controlador api y repositorio de db
  - \_\_tests__: bateria de tests con jest y helper para test de integración via axios para simular llamadas api.

# Cloud
- He estado usando Google Cloud Platform y Amazon Web Services por muchos años
  - GCP: Compute engine, Cloud SQL, Cloud DNS, Cloud run, Cloud functions, Cloud storage, etc.
  - AWS: EC2, Code Pipeline, RDS, VPC, S3, SNS, etc.
  - Firebase: Authentication, Cloud messaging ,etc.

# Pulumi 

- Desde hace unos meses estoy aprendiendo a usar pulumi.
- Este framework permite usar lenguajes como javascript, typescript y otros para expresar la infraestructura de una aplicación utilizando un método llamado "infraestructura como código" (IaC).
- Se declara la infraestructura deseada, y pulumi automatiza todo el proceso de despliegue y actualziación de la infraestructura. 
- Disponible para:
  - AWs
  - GCP
  - Microsoft Azure
- Muestras de iac con pulumi:
  - [index-gcp.ts](index-gcp.ts)
  - [index-aws.ts](index-aws.ts)

# CI/CD

- Muestras de archivos de especificación de compilación:
  - [buildspec.yml](ci-cd/buildspec.yml): Para AWS Codebuild (Fully managed continuous integration service that compiles source code, runs tests, and produces software packages)
  - [cloudbuild.yaml](ci-cd/cloudbuild.yaml): Para GCP Cloud Build (Build, test, and deploy on our serverless CI/CD platform)

# Screenshots de apps vue.js

## Mapas y categorias
![prueba1.png](screenshots/prueba1.png)
![prueba2.png](screenshots/prueba2.png)

## Tablas y controles
![Screenshot_2021-07-12_10-12-18.png](screenshots/Screenshot_2021-07-12_10-12-18.png)
![Screenshot_2021-07-12_10-11-44.png](screenshots/Screenshot_2021-07-12_10-11-44.png)

## Red social con mapas y fotos
![Screenshot_2021-07-12_10-27-08.png](screenshots/Screenshot_2021-07-12_10-27-08.png)
![Screenshot_2021-07-12_09-47-45.png](screenshots/Screenshot_2021-07-12_09-47-45.png)
![Screenshot_2021-07-12_09-49-23.png](screenshots/Screenshot_2021-07-12_09-49-23.png)

![screenshot-localhost_9104-2021.07.12-10_28_00.png](screenshots/screenshot-localhost_9104-2021.07.12-10_28_00.png)

# Referencias en comunidades de programadores

* Stackoverflow:
  > <a href="https://stackoverflow.com/users/333061/igor-parra?tab=topactivity"><img src="https://stackexchange.com/users/flair/132394.png" width="208" height="58" alt="profile for Igor Parra on Stack Exchange, a network of free, community-driven Q&amp;A sites" title="profile for Igor Parra on Stack Exchange, a network of free, community-driven Q&amp;A sites"></a>

* https://www.freelancer.com/u/NomikOS.html
* http://gist.github.com/NomikOS
* https://www.linkedin.com/in/igor-parra-bastias-06335059

# Contacto

- usuario3@gmail.com
- [igorparrabastias-gpg.txt](igorparrabastias-gpg.txt)






