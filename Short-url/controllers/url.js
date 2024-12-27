const shortid = require("shortid")
const URL = require("../models/url")
async function handleGenerateNewShortUrl(req, res) {

    const body = req.body;

    // console.log("Request body: ", body);

    if (!body.url)
        return res.status(400).json({ error: "URL is required" })


    const shortID = shortid();
    // console.log("Generated shortId:", shortID);

    try {
        const newUrl = await URL.create({
            shortId: shortID, // Matches the schema
            redirectURL: body.url,
            visitHistory: [],
        });

        // console.log("Created URL document:", newUrl);

        return res.json({ id: shortID });
    } catch (error) {
        console.error("Error while creating URL:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
    

}

async function handleGetAnalytics(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({totalClicks : result.visitHistory.length, analytics :result.visitHistory })
}
module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics
}