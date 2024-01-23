"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
(0, dotenv_1.config)({ path: path_1.default.resolve(__dirname, '../.env') });
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    console.error('API_KEY not found in environment variables');
    process.exit(1);
}
const url = 'https://newsnow.p.rapidapi.com/';
const requestBody = {
    text: 'Europe',
    region: 'wt-wt',
    max_results: 25,
};
const options = {
    method: 'POST',
    headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'newsnow.p.rapidapi.com',
    },
    body: JSON.stringify(requestBody),
};
const getData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = yield response.json();
        console.log(result);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching data:', error.message);
        }
        else {
            console.error('Unknown error:', error);
        }
    }
});
getData();
