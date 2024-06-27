
# Getting Started

## To start this project
1. Install dependencies
```bash
npm install
```
2. create ```.env ``` file 
```
cp .env.example .env
```
3. Fill environment variables in ```.env```

4. Start 
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure
### To create a page create page.tsx in sub-directory of ```src/app/```

```
src
└-- app
    └--test
       └--page.tsx
```

- This ```page.tsx```  will auto generate route with ```/test/``` for e.g. ```http://localhost:3000/test/```

### To implement third-party services  should create inside ```src/service``` 
e.g. ```src/service/auth/authService.ts```
```
src
└-- service
    └-- auth
        └--authService.tsx
```


### To implement common component that can re-use should create inside  ```src/components```

e.g. ```src/components/Form/Input/InputField.tsx```

```
src
└- components
    └--Form
       └---Input
           └---InputField.tsx
```

### To create any constant should create inside ```src/constants```
e.g. ```src/constants/keyValue.ts```

```
src
└-- constants
     └-- keyValue.ts
```

### To create any utils should create inside ```src/utils```
e.g. ```src/utils/cookie.utils.ts```

```
└── src
   └── utils
        └── cookie.utils.ts
```

---

### Here is this project structure
```
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   ├── next.svg
│   └── vercel.svg
├── src
│   ├── app
│   │   ├── error.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── login
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── todos
│   │       ├── components
│   │       │   ├── CreateTodoModal.tsx
│   │       │   └── TodoListContainer.tsx
│   │       ├── loading.tsx
│   │       ├── page.tsx
│   │       ├── table-view
│   │       │   └── page.tsx
│   │       └── todo.interface.ts
│   ├── components
│   │   ├── Form
│   │   │   ├── Input
│   │   │   │   └── InputField.tsx
│   │   │   ├── Label
│   │   │   │   ├── ErrorLabel.tsx
│   │   │   │   └── FormLabel.tsx
│   │   │   └── validation
│   │   │       ├── loginSchema.ts
│   │   │       └── todoSchema.ts
│   │   └── Navigation
│   │       └── SideNavigation.tsx
│   ├── constants
│   │   ├── keyValue.ts
│   │   └── route.ts
│   ├── core
│   │   └── httpService.ts
│   ├── middleware.ts
│   ├── service
│   │   ├── auth
│   │   │   ├── authService.interface.ts
│   │   │   └── authService.ts
│   │   ├── base
│   │   │   └── baseService.ts
│   │   └── todo
│   │       ├── todoService.interface.ts
│   │       └── todoService.ts
│   └── utils
│       ├── cookie.utils.ts
│       └── token.utils.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

#### Naming convention

- For ```React Component``` Filename I using ```Pascal Case```
  e.g ``` InputField.tsx ```
- For ```React Component``` Component name I using ```Pascal Case``` 
  e.g. ``` TodoListContainer.tsx ``` 
- For ``` Service, Constant, Utils```  Filename I using ```Camel Case``` 
  e.g. ``` todoService.ts ```
- For ``` Class Name ``` I using ```Pascal Case```
  e.g. ``` TodoService ```
- For ``` Function Name ```  I using ```Camel Case``` 
  e.g. ```  getAllTodos() ```