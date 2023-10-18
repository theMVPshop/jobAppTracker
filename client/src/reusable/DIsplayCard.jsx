import React, { useState, useEffect } from "react";
import ky from "ky";

const DisplayCard = ({ card, onSomeAction }) => {
  const [cardDetails, setCardDetails] = useState(null);
  const { user, isAuthenticated } = useAuth0();
  const [file, setFile] = useState(null);
  const [jobInfo, setjobInfo] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [gptRating, setGptRating] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onJobUrlChange = (e) => {
    setJobUrl(e.target.value);
  };

  const fetchjobInfo = async () => {
    setIsLoading(true);
    try {
      const body = { url: jobUrl };
      const response = await ky.post("http://localhost:3000/api/scrape", {
        json: body,
      });
      if (response) {
        setjobInfo(await response.text());
      } else {
        console.error("Response is undefined");
      }
    } catch (error) {
      alert("Error: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch additional details for the card when it's rendered
    if (card) {
      const apiEndpoint = `http://localhost:3000/api/getCardDetails`; // Replace with your actual API endpoint
      ky.get(apiEndpoint, { searchParams: { cardId: card.id } }).then(
        async (response) => {
          if (response.status === 200) {
            const details = await response.json();
            setCardDetails(details);
          } else {
            console.error(
              "Failed to fetch card details:",
              await response.text()
            );
          }
        }
      );
    }
  }, [card]);

  return (
    <CardWrapper>
      {isLoading ? (
        <>
          <progress /> <p>Loading...</p>
        </>
      ) : null}
      <p>{gptRating}</p>
      <div>
        <input type="file" accept=".pdf" onChange={onFileChange} />
        <button onClick={uploadResume}>Upload Resume</button> <br />
        <label htmlFor="job-url">Job Posting URL</label> <br />
        <input onChange={onJobUrlChange} type="text" name="job-url" /> <br />
        <button onClick={fetchjobInfo}>
          Find Job Description from URL
        </button>{" "}
        <br />
        <label htmlFor="job-description">
          Enter Job Description Manually
        </label>{" "}
        <br />
        <textarea
          onChange={onjobInfoChange}
          name="job-description"
          id="job-description"
          cols="30"
          rows="10"
          value={jobInfo}
        />
      </div>
      <button onClick={() => onSomeAction(card)}>Some Action</button>
    </CardWrapper>
  );
};

export default DisplayCard;
