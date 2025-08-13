import express from 'express';

const router = express.Router();

import { router as routerFromForWA } from "./ForWA/routes.js";

router.use("/ForWA", routerFromForWA);

export { router };