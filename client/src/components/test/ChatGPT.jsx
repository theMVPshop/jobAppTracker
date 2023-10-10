import React,{useState, useEffect} from 'react'
import ky from 'ky';


function Chatgpt() {
    const [text, setText] = useState('');
    const [categorizedData, setCategorizedData] = useState(); // Add this line
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await ky.post('http://localhost:4000/categorize', {text});
        console.log("The response:", response)

        setCategorizedData(response.data); // Set the categorized data
      } catch (error) {
        console.error('error:', error);
      }
    };
  
    return (
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <textarea onChange={(e) => setText(e.target.value)} placeholder="Application Text"></textarea>
          <button type="submit">Submit</button>
        </form>
        <p>{text}</p>
  
        {/* Display the categorized data */}
        <div className="categorized-data">
          {/* {Object.keys(categorizedData).map((category) => (
            <div key={category}>
              <strong>{category}:</strong> {categorizedData[category]}
            </div>
          ))} */}
          {categorizedData}
        </div>
      </div>
    );
  }
  
  export default Chatgpt;
  