"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsScrapeController = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
class NewsScrapeController {
    async scrape(req, res) {
        try {
            const url = 'https://brasil.mapbiomas.org/noticias/';
            const response = await axios_1.default.get(url);
            const $ = cheerio.load(response.data);
            const noticias = [];
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
        }
        catch (error) {
            console.error('Erro ao fazer scraping:', error);
            res.status(500).json({ message: 'Erro ao fazer scraping' });
        }
    }
}
exports.NewsScrapeController = NewsScrapeController;
