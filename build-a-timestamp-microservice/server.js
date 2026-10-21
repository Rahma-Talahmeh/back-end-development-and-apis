
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// التاريخ الحالي
app.get('/api', function (req, res) {
  const date = new Date();

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// تاريخ محدد أو تاريخ غير صالح
app.get('/api/:date', function (req, res) {
  const dateInput = req.params.date;
  let date;

  if (/^-?\d+$/.test(dateInput)) {
    date = new Date(Number(dateInput));
  } else {
    date = new Date(dateInput);
  }

  if (isNaN(date.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});


const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

listener.on('error', function (err) {
  console.error('Server error:', err.message);
});
