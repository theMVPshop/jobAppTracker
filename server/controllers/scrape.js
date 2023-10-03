import puppeteer from 'puppeteer';
import cheerio from 'cheerio';

export const scrape = async (req, res) => {
    try {
        const { url } = req.body;

        const browser = await puppeteer.launch({ headless: "true" });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle0' });
        const content = await page.content();

        await browser.close();

        const $ = cheerio.load(content);

        let jobDescription = "";

        if (url.toLowerCase().includes("linkedin.com")) {
            jobDescription = parseLinkedIn($);
        }

        if (jobDescription) {
            return res.status(200).send(jobDescription);
        } else {
            return res.status(404).send("No job description found.");
        }

    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
};

const parseLinkedIn = ($) => {
    if ($('#job-details').length > 0) {
        return $('#job-details').text().trim();
    }

    const jobsDescription = $('.jobs-description').first();
    if (jobsDescription.length > 0) {
        return jobsDescription.text().trim();
    }

    const showMoreLess = $(".show-more-less-html__markup").first();
    if (showMoreLess.length > 0) {
        return showMoreLess.text().trim();
    }

    return "";
}