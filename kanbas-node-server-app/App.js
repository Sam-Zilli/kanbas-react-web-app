import Lab5 from "./Lab5/index.js";
import cors from "cors";
const app = express();
app.use(cors());                    // make sure cors is used right after creating the app
Lab5(app);                          // express instance
app.listen(4000)