# 🚀 Teslo | Shop

Una aplicación ecommerce moderna construida con [Next.js](https://nextjs.org/), diseñada para ofrecer una experiencia rápida, escalable y amigable para el usuario. Este proyecto utiliza las mejores prácticas de desarrollo con Next y herramientas modernas para el frontend y backend. Tiene pagos con paypal pero se puede cambiar a otro sin problemas.

## 🖥️ Demo

🔗 [Ver Demo en vivo](https://teslo-crdavip.vercel.app/)  

---

## 🧰 Tecnologías utilizadas

- **Next.js** – Framework React para SSR, SSG y App Router
- **React** – Librería de UI
- **TypeScript** – Tipado estático para mayor robustez
- **Tailwind CSS** – Estilado rápido con clases utilitarias
- **PostgreSQL** - Base de datos relacional
- **Docker** - Empaquetar, distribuir y ejecutar aplicaciones en contenedores
- **Prisma** - Herramienta de mapeo objeto-relacional para Node.js

---

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/crdavip/teslo-shop.git
cd teslo-shop
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
AUTH_SECRET=
NEXT_PUBLIC_PAYPAL_CLIENT_ID=
PAYPAL_SECRET=
PAYPAL_OAUTH_URL=
PAYPAL_ORDERS_URL=
CLOUDINARY_URL=
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
🔗 [GitHub](https://github.com/crdavip) · [LinkedIn](https://www.linkedin.com/in/crdavip/)