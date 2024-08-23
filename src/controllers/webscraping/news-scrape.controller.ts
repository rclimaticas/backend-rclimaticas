import { Request, Response } from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';

export class NewsScrapeController {
    async scrape(req: Request, res: Response) {
        try {
            const url = 'https://brasil.mapbiomas.org/noticias/';
            const response = await axios.get(url);

            const $ = cheerio.load(response.data);

            const noticias: { id: number; titulo: string; link: string | undefined; imgSrc: string | undefined }[] = [];

            $('.post-item').each((index, element) => {

                const titulo = $(element).find('.post-title').text().trim();
 
                let link = $(element).find('a').attr('href');

                const imgSrc = $(element).find('.post-thumbnail img').attr('src');

                if (link && !link.startsWith('http')) {
                    link = new URL(link, url).href;
                }
                if (titulo) {
                    noticias.push({ id: index, titulo, link, imgSrc });
                }
            });

            res.json(noticias);
        } catch (error) {
            console.error('Erro ao fazer scraping:', error);
            res.status(500).json({ message: 'Erro ao fazer scraping' });
        }
    }
}
