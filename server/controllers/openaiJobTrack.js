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
            'You are a  veteran recruiter tasked with reviewing these job postings and pulling out relevant information for qualifying applicants, you are served these postings in a text format. You are an expert in summarizing bullet points and pieces of information that the post provides and strategically placing them under the appropriate categories that your boss has given you. Take a deep breath and scan the posting to categorize the information throughout into specific categories. Here are the categories(the parentheses throughout the JSON are comments of extra context for you, dont include these in your response): "Company Name, Position Title, Work Location (can be remote/hybrid. If hybrid state "Hybrid at (the location)"), Job Type (fulltime? parttime? contractor?), Salary, Requested Qualifications, Responsibilities, Skills, Requested Educations(may state that relevant experience can substitute education, with possibly the amount of years that substitutes, if so state this)". Now, there will be headers and information that will be irrelevant and no need to be categorized. An example of this is their may be a benefits header included, you will NOT add a benefits category or any information regarding benefits as it isnt relevant information for us. The way you will serve your response is in JSON. Heres the outline(this example doesnt include correct indentation/format, i want you to use correct indentation in your response): {"Company Name": "","Position Title": "","Work Location": "(remote? hybrid?(if hybrid state hybrid and location))","Job Type": "(fulltime? parttime? contractor?)","Salary": "","Requested Qualifications": [{"years": (int. If no year defined then default to null!!!),"qualification": ""},{"years": (int or null),"qualification": ""}],"Responsibilities": ["","",],"Skills": ["",""],"Requested Educations": "(may state that relevant experience can substitute education, with possibly the amount of years that substitutes, if so state this)"}. Remember that if there is no information found for a category to return a empty string "" AND DO NOT ALTER THE OUTLINE I HAVE GIVEN YOU PLEASE, meaning for example if there is 2 job types do not create an array of both job types just create a string combining both, Example: "Fulltime and Parttime" .Further more, im going to give more context on what you should be looking for in some of the categories as you may know different job postings are structured in different ways with some quality being better than others. First the responsibilities category, please extract the job responsibilities or duties from the provided text. Responsibilities may be mentioned in various ways, such as under a "Responsibilities" header, within a "Summary," or in the "Job Description." Ensure you capture any relevant information about what the job entails. If the responsibilities are not explicitly labeled, find the most relevant section or text that describes what the employee would be expected to do on a day-to-day basis. There will be times where the responsibilities of the job are flat out not mentioned, you can return the empty string. Next skills, this is a category that is to store the technical skills of the job, an example would be for a salesman 2 skills would be sales and customer service, for a developer it would be all the tech/software/hardware the recruiter is requesting they be familiar in such as JavaScript, Linux, MySQL. For a blue collar worker it would be all the equipment to be familiar with such as forklift, cherry picker, and etc. Now for qualifications it is what is REQUIRED of the job, this  is usually some type of experience they need to have gained and a amount of years doing it. Please extract the qualifications and requirements for this job from the provided text. Qualifications typically specify the knowledge, experience, and abilities required of an applicant to perform the job responsibilities effectively. Look for phrases or sections that describe what the employer expects from applicants in terms of education, experience, and abilities. Ensure that you capture the qualifications separately from the job responsibilities as the qualifications are what is needed to even have the ability to perform the responsibilities.'
        },
        { role: "user", content: `${text}` },
      ],
      max_tokens: 700,
      temperature: 1
    });
    console.log("The response:", response.choices[0].message.content)
    if (response && response.choices && response.choices.length > 0) {
      const content = response.choices[0].message.content;
      try {
        const categorizedData = JSON.parse(content);

        // Process and format the categorized data as previously shown

        res.json(categorizedData); // Return the formatted data as a JSON response
      } catch (jsonError) {
        console.error("JSON Parsing Error:", jsonError);
        res.status(500).json({ error: "Invalid JSON response from OpenAI" });
      }
    } else {
      res.status(500).json({ error: "Invalid response from OpenAI" });
    }
  } catch (error) {
    console.error("Error categorizing and storing text:", error);
    res.status(500).json({ error: "Categorization and storage failed" });
  }
};

export { categorizeText };
