const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const myDataRouter = require("./api/mydata");

const app = express();
const port = process.env.PORT || 4000;
app.use(cors());
app.use("/api/mydata", myDataRouter);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "api/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
app.post("/upload", upload.single("image"), (req, res) => {
  const { originalname, mimetype, filename } = req.file;
  const file = fs.readFileSync(`api/uploads/${filename}`); 
  const data = [
    {
      id: Date.now(),
      name: originalname,
      type: mimetype,
      data: file.toString("base64"),
    },
  ];
  const Is_old_json_exit = fs.readFileSync("data.json").toString();
  if (Is_old_json_exit) {
    const total = JSON.parse(Is_old_json_exit).length;
    if (total > 0) {
      const old_data = JSON.parse(fs.readFileSync("data.json"));
      old_data.push(...data);
      fs.writeFileSync("data.json", JSON.stringify(old_data));
    }
  } else {
    fs.writeFileSync("data.json", JSON.stringify(data));
  }
  res.send("File uploaded successfully! and total length is ");
});
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
