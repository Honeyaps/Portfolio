const express = require("express");
const cors = require("cors");
const zod = require("zod");
const User = require("./db");


const app = express();

app.use(cors());
app.use(express.json());

const validate = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    message: zod.string(),
})

app.post("/message", async (req, res) => {
    const body = req.body;
    const success = validate.safeParse(body);
  
    if (!success) {
      return res.status(403).json({ msg: "data is not valid" });
    }
  
    try {
      const response = await User.create({
        name: body.name,
        email: body.email,
        message: body.message
      });
  
      return res.json({
        msg: "msg sent succesfully"
      });

    } catch (error) {
      console.log(error);
      return res.status(403).json({ msg: "error while sending msg" });
    }
  });

app.listen(4400,() => {
    console.log("Port connected")
})

