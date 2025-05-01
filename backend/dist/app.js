"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const queryRoute_1 = __importDefault(require("./routes/queryRoute"));
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors({
    origin: "http://localhost:5173"
}));
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Server is healthy"
    });
});
app.use('/api', queryRoute_1.default);
app.listen(PORT, () => {
    console.log("server running on port", 5000);
});
