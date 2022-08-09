import { getTextFieldUtilityClass } from "@mui/material";

const fs = require('fs');

export default function getText() {
    return fs.readFileSync('../data/threepigs.txt');
}