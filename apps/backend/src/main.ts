import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser(process.env.COOKIE_SECRET));
    app.enableCors({
        credentials: true,
        origin: process.env.HOST_URL,
    });
    await app.listen(5000);
}
bootstrap();
