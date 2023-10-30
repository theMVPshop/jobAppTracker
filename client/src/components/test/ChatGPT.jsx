import React,{useState} from 'react'
import ky from 'ky';



function Chatgpt() {
  const [text, setText] = useState('');
  const [categorizedData, setCategorizedData] = useState(null); // Initialize as null

  const handleSubmit = async (e) => {
    console.log("Running")
    e.preventDefault();
    try {
      const response = await ky.post('http://localhost:4000/categorize', { text });
      console.log(response.data)
      setCategorizedData(response.data); // Set the categorized data
    } catch (error) {
      console.error('error:', error);
    }
    console.log("done")
  };

  const dataToServer = async () => {
    console.log("data to backend")
    try {
      await axios.post('http://localhost:4000/applications', {categorizedData})
    } catch (error) {
      console.log(error)
    }
    console.log("data to backend done")
  }

  // Function to render the categorized data
  const renderCategorizedData = () => {
    if (!categorizedData) {
      return null;
    }
  
    return (
      <div>
        <h2>Categorized Data:</h2>
        <ul>
          <li>
            <strong>Company Name:</strong> {categorizedData['Company Name'] == "" ? "No relevant Company Name found" : categorizedData['Company Name']}
          </li>
          <li>
            <strong>Position Title:</strong> {categorizedData['Position Title'] == "" ? "No relevant Position Title found" : categorizedData['Position Title']}
          </li>
          <li>
            <strong>Work Location:</strong> {categorizedData['Work Location'] == "" ? "No relevant Work Location found" : categorizedData['Work Location']}
          </li>
          <li>
            <strong>Job Type:</strong> {categorizedData['Job Type'] == "" ? "No relevant Job Type found" : categorizedData['Job Type']}
          </li>
          <li>
            <strong>Salary:</strong> {categorizedData['Salary'] == "" ? "No relevant Compensation found" : categorizedData['Salary']}
          </li>
          <li>
            <strong>Requested Qualifications:</strong>
            <ul>
              {categorizedData['Requested Qualifications'] == "" || categorizedData['Requested Qualifications'].length ===0 ? "No relevant Qualfications Found" : categorizedData['Requested Qualifications'].map((qualification, index) => (
                <li key={index}>
                  {qualification.years ? `${qualification.years} years of ` : ''}
                  {qualification.qualification}
                </li>
              ))}

            </ul>
          </li>
          <li>
            <strong>Responsibilities:</strong>
            <ul>
              {categorizedData['Responsibilities'] == "" || categorizedData['Responsibilities'].length===0 ? "No relevant Responsibilites found" : categorizedData['Responsibilities'].map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))}
              
            </ul>
          </li>
          <li>
            <strong>Skills:</strong>
            <ul>
              {categorizedData['Skills'] == "" || categorizedData['Skills'].length===0 ? "No relevant Skills found" : categorizedData['Skills'].map((skill, index) => (
                <li key={index}>{skill}</li>
              ))} 
              
            
            </ul>
          </li>
          <li>
            <strong>Requested Education:</strong> {categorizedData['Requested Educations'] == "" ? "No relevant Educations found" : categorizedData['Requested Educations'] }
          </li>
        </ul>
        <button onClick={dataToServer}>Save Resume</button>
      </div>
    );
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea onChange={(e) => setText(e.target.value)} placeholder="Application Text"></textarea>
        <button type="submit">Submit</button>
      </form>
      <p>{text}</p>
      {renderCategorizedData()}
    </div>
  );
}

export default Chatgpt;

  