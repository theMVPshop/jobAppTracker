import { openai } from "../../server.js";


export const categorizeText = async (req, res) => {

  console.log("Categorizing...");
  const { jobInfo } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            `You are a recruiter reviewing job postings to extract key information. Categorize the provided text into the following categories: "company_name, position_title, location (indicate if remote/hybrid), job_type (full-time, part-time, contractor), salary, qualifications, responsibilities, skills, education". The response should be in JSON format with this outline: {"company_name": "","position_title": "","location": "","job_type": "","salary": "","qualifications": "","responsibilities": "","skills": "","education": ""}. If a category has no information, return an empty string "". Extract job responsibilities from sections like "Responsibilities", "Summary", or "Job Description". For skills, concisely include technical and soft skills required for the job and separate them by commas. Qualifications is previous work experience and other requirements, for example: eligibility to work in the U.S. without visa sponsorship, relocation, available to work weekends, COVID-19 vaccination, etc. For education, note any required or preferred education levels, certifications, or training, and if relevant experience can substitute for education, include that information. Remember this is for recruiting, so nothing should be in first person, i.e. no using "we," "I," "our client," etc. Instead use third person. Keep everything succinct and avoid fluff.`
        },
        { role: "user", content: `${jobInfo}` }
      ]
    });

    if (response && response.choices && response.choices.length > 0) {
      const content = response.choices[0].message.content;
      try {
        const categorizedData = JSON.parse(content);

        // console.log("Categorized data in controller:", categorizedData)
        // console.log("Content in controller", content)
        // Process and format the categorized data as previously shown
        // console.log("The response in controller:", response.choices[0].message.content)
        return res.json(categorizedData); // Return the formatted data as a JSON response
      } catch (jsonError) {
        console.error("JSON Parsing Error:", jsonError);
        return res.status(500).json({ error: "Invalid JSON response from OpenAI" });
      }
    } else {
      return res.status(500).json({ error: "Invalid response from OpenAI" });
    }
  } catch (error) {
    console.error("Error categorizing and storing text:", error);
    return res.status(500).json({ error: "Categorization and storage failed" });
  }
};

