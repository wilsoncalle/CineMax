# CineMax - Plataforma de Cine

## Estructura del Proyecto

```
cine-max/
├── index.html                  # Página principal
├── genero.html                 # Página de películas por género
├── login.html                  # Página de inicio de sesión
├── register.html               # Página de registro
├── resultados_busqueda.html    # Página de resultados de búsqueda
├── mose.html                   # (Archivo vacío)
│
├── css/                        # Estilos CSS
│   ├── styles.css              # Estilos principales
│   ├── auth.css                # Estilos para autenticación
│   └── normalize.css           # Normalización de estilos
│
├── js/                         # Scripts JavaScript
│   ├── main.js                 # Script principal
│   └── slider.js               # Script para slider (vacío)
│
├── pages/                      # Páginas adicionales
│   ├── cartelera.html          # Página de cartelera
│   ├── contacto.html           # Página de contacto
│   ├── pelicula.html           # Página de detalle de película
│   └── promociones.html        # Página de promociones
│
├── img/                        # Imágenes del sitio
│
└── assets/                     # Recursos adicionales
```

## Descripción de Componentes

### Páginas Principales
- **index.html**: Página principal con navegación, hero section, y secciones principales
- **genero.html**: Muestra películas filtradas por género
- **login.html**: Formulario de inicio de sesión
- **register.html**: Formulario de registro de usuarios
- **resultados_busqueda.html**: Muestra resultados de búsqueda de películas

### Estilos (CSS)
- **styles.css**: Contiene todos los estilos principales del sitio
  - Estilos de navegación
  - Estilos de tarjetas de películas
  - Estilos de modales
  - Estilos responsivos
  - Estilos de footer
- **auth.css**: Estilos específicos para páginas de autenticación
- **normalize.css**: Normalización de estilos entre navegadores

### Scripts (JavaScript)
- **main.js**: Script principal que maneja:
  - Interacción con la API de TMDB
  - Funcionalidad de búsqueda
  - Gestión de modales
  - Navegación responsive
- **slider.js**: (Pendiente de implementación) Para carruseles de películas

### Páginas Adicionales
- **cartelera.html**: Muestra la cartelera actual
- **contacto.html**: Formulario de contacto
- **pelicula.html**: Detalles de una película específica
- **promociones.html**: Información sobre promociones

## Características Principales

1. **Diseño Responsivo**
   - Adaptable a diferentes tamaños de pantalla
   - Menú hamburguesa para dispositivos móviles
   - Grid system para tarjetas de películas

2. **Integración con TMDB API**
   - Búsqueda de películas
   - Filtrado por género
   - Visualización de detalles de películas

3. **Sistema de Autenticación**
   - Login de usuarios
   - Registro de nuevos usuarios
   - Gestión de sesiones

4. **Interfaz de Usuario**
   - Modales para compra de tickets
   - Sistema de búsqueda
   - Navegación intuitiva
   - Animaciones y transiciones

5. **Optimización**
   - Lazy loading de imágenes
   - Carga asíncrona de datos
   - Manejo de errores

## Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- API de The Movie Database (TMDB)
- Font Awesome para iconos
- Normalize.css para consistencia entre navegadores

## Estructura de Archivos

### Directorio `css/`
Contiene todos los archivos de estilos, organizados por funcionalidad:
- Estilos generales
- Estilos de autenticación
- Normalización de estilos

### Directorio `js/`
Contiene los scripts JavaScript:
- Script principal con la lógica de la aplicación
- Script para funcionalidad de slider (pendiente)

### Directorio `pages/`
Contiene páginas adicionales del sitio:
- Cartelera
- Contacto
- Detalles de película
- Promociones

### Directorios de Recursos
- `img/`: Imágenes del sitio
- `assets/`: Recursos adicionales
