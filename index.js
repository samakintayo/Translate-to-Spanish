import express from "express";
import axios from "axios";
import reload from "reload";
import bodyParser from "body-parser";

const app = express();
const port = 5500;




const API_URL = "https://text-translator2.p.rapidapi.com/translate"

const config = {
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'e133adfc2cmsh451a22166737364p1e57b0jsnff12354ff2ba',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
    }
};

//34069294cfmshe66a20f25c1a776p15cda4jsn03f7dd4cb631

//e133adfc2cmsh451a22166737364p1e57b0jsnff12354ff2ba

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));




app.get("/", async (req, res) => {


    try {
        res.render("index.ejs", {
            content: {
                translation: "..Waiting to Translate"
            }
        })

    } catch (error) {
        console.error(error.message);
    }


});


app.post('/translate-word', async(req, res) => {
    const entryWord = req.body.text;
    const translation = {
        'text': entryWord,
        'target_language': 'es',
        'source_language': 'en',
    }

    console.log(entryWord);

    try {
        const response = await axios.post(API_URL, translation, config);
        const output = response.data.data;

        console.log(output);
        res.render("index.ejs", {
            content: {
                translation: output.translatedText,
            },
        })

    } catch (error) {
        console.error(error);
    }

})



app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});