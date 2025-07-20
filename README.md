# 🚀 Teslo | Shop

Una aplicación web moderna construida con [Next.js](https://nextjs.org/), diseñada para ofrecer una experiencia rápida, escalable y amigable para el usuario. Este proyecto utiliza las mejores prácticas de desarrollo con Next y herramientas modernas para el frontend.

## 🖥️ Demo

🔗 [Ver Demo en vivo](https://tu-sitio-web.com)  

---

## 🧰 Tecnologías utilizadas

- **Next.js** – Framework React para SSR, SSG y App Router
- **React** – Librería de UI
- **TypeScript** – Tipado estático para mayor robustez
- **Tailwind CSS** – Estilado rápido con clases utilitarias
- **PostgreSQL** - Base de datos relacional
- **Docker** - 
- **Prisma** - 

---

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/mi-proyecto-next.git
cd mi-proyecto-next
```

### 2. Instalar las dependencias

```bash
npm install
# o
yarn install
```

### 3. Configurar las variables de entorno

Crea un archivo .env.local en la raíz del proyecto con tus variables de entorno:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
DB_USER=
DB_NAME=
DB_PASSWORD=
DATABASE_URL=
```

### 4. Levantar la BD de PostgreSQL

```bash
docker compose up -d
```

### 5. Ejecutar las migraciones de Prisma

```bash
npx prisma migrate dev
```

### 6. Ejecutar la semilla de datos

```bash
npm run seed
```

### 7. Iniciar el servidor de desarrollo

```bash
npm run dev
# o
yarn dev
```

Accede a la aplicación en: http://localhost:3000

---

## 🧪 Scripts útiles

```bash
npm run dev       # Servidor de desarrollo
npm run build     # Compilación para producción
npm run start     # Iniciar en modo producción
npm run lint      # Ejecutar ESLint
npm run format    # Formatear con 
npm run seed      # Ejecutar semilla de datos
```

---

## 👨‍💻 Autor
Desarrollado con ❤️ por **Cristian David**
🔗 [GitHub](https://tu-sitio-web.com) · [LinkedIn](https://tu-sitio-web.com)