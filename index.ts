import express from 'express';
import type { Request, Response } from 'express';
import axios from 'axios';
import type { Method } from 'axios';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all(/.*/, async (req: Request, res: Response) => {
    const baseURL = req.query.baseURL;

    if (!baseURL || typeof baseURL !== 'string') {
        return res.status(400).send('Missing or invalid baseURL query parameter');
    }

    try {
        const targetUrl = new URL(baseURL);
        
        const newSearchParams = new URLSearchParams(req.query as Record<string, string>);
        newSearchParams.delete('baseURL');
        targetUrl.search = newSearchParams.toString();

        const response = await axios({
            method: req.method as Method,
            url: targetUrl.toString(),
            data: req.body,
            headers: {
                ...req.headers,
                host: targetUrl.host,
            },
            responseType: 'stream'
        });

        res.status(response.status);
        
        for (const key in response.headers) {
            res.setHeader(key, response.headers[key]);
        }

        response.data.pipe(res);

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            res.status(error.response.status);
            for (const key in error.response.headers) {
                res.setHeader(key, error.response.headers[key]);
            }
            error.response.data.pipe(res);
        } else if (axios.isAxiosError(error) && error.request) {
            console.error('Error making request:', error.message);
            res.status(502).send('Bad Gateway: The proxy server could not reach the upstream server.');
        } 
        else {
            console.error('Unknown error:', error);
            res.status(500).send('Internal Server Error');
        }
    }
});

app.listen(port, () => {
    console.log(`AI Proxy server listening at http://localhost:${port}`);
});
