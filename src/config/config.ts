import express, { Express } from "express";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "passport";
import configPassport from "./passport.config";
import path from "path";

function config(app: Express): void {
	// config EJS
	app.set("views", path.join(__dirname, "..", "..", "src", "views"));
	app.set("view engine", "ejs");

	// config mongoose
	const MONGO_URL: string = (
		process.env.ENV === "development"
			? process.env.MONGO_LOCAL_URL
			: process.env.MONGO_REMOTE_URL
	) as string;
	const clientP = mongoose
		.connect(MONGO_URL, {
			serverSelectionTimeoutMS: 2000,
			dbName: "forklify",
		})
		.then(m => m.connection.getClient());

	// session setup & cookies setup
	app.use(
		session({
			secret: process.env.COOKIE_SECRET as string,
			resave: false,
			saveUninitialized: false,
			store: MongoStore.create({
				clientPromise: clientP,
				collectionName: "sessions",
				stringify: false,
			}),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24, // equals to 1 day
			},
		})
	);

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	// passport setup
	app.use(passport.initialize());
	app.use(passport.session());
	configPassport();

	// add static files to passport
	app.use(express.static("src/public"));
}

export default config;
