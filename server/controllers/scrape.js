import * as cheerio from "cheerio";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

export const scrape = async (req, res) => {
    try {
        console.log(req.body)
        const { url } = req.body;
        const domain = new URL(url).hostname.split(".").slice(-2).join(".");
        const parser = parsers[domain];
        const transformer = urlTransformers[domain];
        if (!parser) return res.status(400).send("Website not supported.");
        
        const jobDescription = await fetchAndParse(url, parser, transformer);
        return jobDescription ? res.status(200).send(jobDescription) : res.status(404).send("No job description found.");

    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
};

const fetchAndParse = async (url, parser, transformer) => {
    const browser = await puppeteer.use(StealthPlugin()).launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(transformer ? transformer(url) : url, { waitUntil: "networkidle0" });
    const content = await page.content();
    await browser.close();
    const $ = cheerio.load(content);
    return parser($);
};

const transformIndeedUrl = (url) => {
    const urlObj = new URL(url);
    const vjkValue = new URLSearchParams(urlObj.search).get("vjk") || urlObj.searchParams.get("jk");
    return `https://www.indeed.com/viewjob?jk=${vjkValue}`;
};

const parseLinkedIn = ($) => {
    return $("#job-details").text().trim() || $(".jobs-description").first().text().trim() || $(".show-more-less-html__markup").first().text().trim() || "";
};

const parseIndeed = ($) => {
    return $("#jobDescriptionText").text().trim() || $(".jobsearch-jobDescriptionText").text().trim() || "";
};

const parseZipRecruiter = ($) => { 
    return $(".job_details").text().trim() || "";
 }

const parsers = {
    "linkedin.com": parseLinkedIn,
    "indeed.com": parseIndeed,
    "ziprecruiter.com": parseZipRecruiter,  
};

const urlTransformers = {
    "indeed.com": transformIndeedUrl,
};