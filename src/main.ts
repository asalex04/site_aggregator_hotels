import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as session from "express-session";
import * as passport from "passport";
import {NestExpressApplication} from "@nestjs/platform-express";
import {ConsoleLogger, Logger, ValidationPipe} from "@nestjs/common";

const start = async () => {
  try {
    const RUN_HOST = process.env.RUN_HOST || '127.0.0.1'
    const PORT = process.env.PORT || 5000
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      logger: new ConsoleLogger(),
      cors: {
        origin: true,
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        credentials: true,
        maxAge: 3600
      }
    })
    app.use(session({
      secret: process.env.PRIVET_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 }
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    app.setGlobalPrefix('api')
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    const config = new DocumentBuilder()
      .setTitle('BOOKS')
      .setDescription('Документация REST API')
      .setVersion('1.0.0')
      .build()

    const document = SwaggerModule.createDocument(app, config)

    SwaggerModule.setup('/api/docs', app, document)

    await app.listen(PORT, () => {
      Logger.log(`http://${RUN_HOST}:${PORT} - server start`)
      Logger.log(`http://${RUN_HOST}:${PORT}/api/docs - swagger start`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
