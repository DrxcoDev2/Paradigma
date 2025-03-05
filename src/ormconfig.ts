import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "koa_db",
    synchronize: true,
    logging: false,
    entities: [User],
});

AppDataSource.initialize()
    .then(function () {
        console.log("Base de datos conectada")
    })
    .catch(function (error) {
        console.log(error)
    });