import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

// 1. مسار التاريخ المحدّد (مع استخدام المسار البسيط بدون رموز معقدة تسبب مشاكل)
app.get("/api/:date", function (req, res) {
  let dateParam = req.params.date;
  let date;

  // التحقق هل هو رقم أم نص تاريخ
  if (!isNaN(dateParam) && /^\d+$/.test(dateParam)) {
    date = new Date(parseInt(dateParam));
  } else {
    date = new Date(dateParam);
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// 2. مسار الطلب الفارغ (الحالي)
app.get("/api", function (req, res) {
  const date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Do not change code below this line

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
