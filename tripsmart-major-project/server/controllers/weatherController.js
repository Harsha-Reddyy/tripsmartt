import axios from 'axios';
export const getWeather = async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ message: 'city is required' });
  if (!process.env.OPENWEATHER_API_KEY) {
    return res.json({ city, temperature: 'API key not configured', condition: 'Add OPENWEATHER_API_KEY for live weather' });
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;
  const { data } = await axios.get(url);
  res.json({ city, temperature: data.main.temp, condition: data.weather?.[0]?.description, humidity: data.main.humidity, wind: data.wind.speed });
};
