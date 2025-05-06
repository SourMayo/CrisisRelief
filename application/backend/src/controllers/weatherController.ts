import fetch from 'node-fetch';
import { Request, Response } from 'express';

export const getWeather = async (req: Request, res: Response) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== '200') {
            return res.status(404).json({ error: 'City not found' });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};
