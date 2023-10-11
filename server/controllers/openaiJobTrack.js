import { openai } from "../../server.js";

const categorizeText = async (req, res) => {
  const text = req.body.text;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are going to be receiving the text of job applications. Scan the text format of the job application and each piece of information categorize it into one of the following categories. If a piece of information is not relevant to one of these categories ignore it. An example of this is there may be benefits and certifications included in the data, you would ignore this. Also do not add in any new categories into the response, using the benefits example, this means dont add a benefits header into the text. Neatly organize each piece of information under each categorization with bulletin points. Here's the categories for you to perform the categorization: Categorize this application into these categories - Company Name, Position Title, Work Location (if remote then state that instead), Job Type (fulltime? parttime? contractor?), Salary, Requested Experiences (with years if given), Requested Technical Skills, Requested Soft Skills, Requested Educations.",
        },
        { role: "user", content: `${text}` },
      ],
    });

    // Extract the categorized result from the API response

    console.log(response.choices[0].message.content);
    res.json(response.choices[0].message.content);
  } catch (error) {
    console.error("Error categorizing text:", error);
    res.status(500).json({ error: "Categorization failed" });
  }
};

export { categorizeText };
