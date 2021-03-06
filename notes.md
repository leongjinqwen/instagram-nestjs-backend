**Installing NestJs cli**
```
npm i -g @nestjs/cli
```

**Create new Project**
```
nest new <project-name>
cd <project-name>
npm run start => run the application
npm run start:dev   => run in watch mode (hot reload)
```

Inside the `src` folder you can find five files in the initial project setup:
- `main.ts`: Entry point of application. By using the NestFactory.create() method a new Nest application instance is created.
- `app.module.ts`: Contains the implementation of the application’s root module.
- `app.controller.ts`: Contains the implementation of a basic NestJS controller with just one route.
- `app.service.ts`: Contains the a basic service implementation.
- `app.controller.spec.ts`: Testing file for controller.


**Generate new Controller**  
Controllers are responsible for handling incoming `requests` and returning `responses` to the client.
```
nest g controller users
```
In your new `users.controller.ts` :
```ts
import { Controller, Get, Param } from '@nestjs/common';

@Controller('users') // path prefix
export class UsersController {
    @Get() // get method
    findAll(): string {
        return 'Return all users.'
    }
    @Get(':id') // get with parameter
    findOne(@Param('id') id: string): string {
        return `Get user with id equal to ${id}.`
    }
}
```

**Generate new Service**  
Many of the basic Nest classes may be treated as a provider – services, repositories, factories, helpers, and so on. The main idea of a provider is that it can inject dependencies; this means objects can create various relationships with each other, and the function of "wiring up" instances of objects can largely be delegated to the Nest runtime system. A provider is simply a class annotated with an `@Injectable()` decorator.  

Service will be responsible for data storage and retrieval, and is designed to be used by the `controller`.
```
nest g service users
```

**User Authentication (Passport.js)**  
- Guards: to determine whether a request will be handled by the route handler or not depending on certain conditions (like permissions, roles, ACLs, etc.) present at run-time.  
- Protecting endpoints by requiring a valid JWT be present on the request

```
# to provide auth guard with strategy
npm install --save @nestjs/passport passport passport-local
npm install --save-dev @types/passport-local

# to create jwt
npm install --save @nestjs/jwt passport-jwt
npm install --save-dev @types/passport-jwt

# to hash password
npm install @types/bcrypt bcrypt
```

**Hash Password before insert into Database**  
```js
import * as bcrypt from 'bcrypt';

const password = '12345678';
const hash = await bcrypt.hash(passwordInPlaintext, 10);
 
const isPasswordMatching = await bcrypt.compare(passwordInPlaintext, hashedPassword);
console.log(isPasswordMatching); // true
```

**Handle Environment Variable with nestjs-config**  
(https://github.com/nestjsx/nestjs-config)
```
npm install nestjs-config
npm install @types/dotenv dotenv
```


**Upload file to AWS S3 Bucket**  
```
npm install aws-sdk @types/aws-sdk # connect to aws
npm install uuid @types/uuid # create unique filename
```

**Deployment**  
(https://www.joshmorony.com/deploying-a-production-nestjs-server-on-heroku/)
1. Modify src/main.ts to use a dynamic port
    ```js
    await app.listen(process.env.PORT || 3000);
    ```

1. Modify the package.json File  
    Need to run the `prebuild` to build our dist folder. Add `postinstall` script to automatically run after Heroku has finished installed the dependencies.
    ```json
    "postinstall": "npm run prebuild",
    ```

1. Set environment variable with heroku config  
    We need all of the devDependencies in `package.json` for it to run properly, so change `NPM_CONFIG_PRODUCTION` to `false`
    ```
    NPM_CONFIG_PRODUCTION=false
    NODE_ENV=production
    MONGO_URI=""
    SECRET_KEY=""
    AWS_S3_BUCKET_NAME=""
    AWS_ACCESS_KEY_ID=""
    AWS_SECRET_ACCESS_KEY=""
    ```

1. Create `Procfile` at the root of project  
    It allows us to specifically supply the command we want to run to start the application rather than the default `start` script.
    ```
    web: npm run start:prod
    ```

1. Add heroku remote then push to heroku master  
    ```
    heroku git:remote -a <app-name>
    git push heroku master
    ```

1. Failed to connect to MongoDB Atlas even after build succeeded  
    You only be able to connect to your cluster from the IP Addresses that you listed in MongoDB Atlas account `Network Access`. Add `0.0.0.0/0` (i.e. all addresses) to your MongoDB Atlas whitelist, so heroku can connect to your cluster. 