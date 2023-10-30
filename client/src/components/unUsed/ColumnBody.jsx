
import React,{useState,useEffect} from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const Column = (props) => {
  const [resumes,setResumes] = useState(null);
  const { user, isAuthenticated } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  
  
  useEffect(() => {
    const fetchResume = async () => {
      const resumeData = await axios.get(`http://localhost:3000/api/resume/users/${user.sub}`)
    setResumes(resumeData);
    console.log(resumes)
    }
  })

  const updateResume = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }
    if (!isAuthenticated) {
      alert("Please log in first.");
      return;
    }
    if (!user.sub) {
      alert("Error getting user ID.");
      return;
    }

    setIsLoading(true);

    try {
      const updatedResumeData = await axios.put(`http://localhost:3000/api/resume/users/${user.sub}`, {body: formData})

    } catch(error) {
      console.log("Error updating resume:", error)
    }
  }

  const deleteResume = () => {
    try {

    } catch(error) {
      console.log("Error deleting resume:", error)
    }
  }


  return (
    <div>

    </div>
  )
}

export default Column;














// import styled from "styled-components";
// import TileCard from "./TileCard";
// import { useEffect, useState } from "react";

// const ColumnBody = (props) => {
//   const [color, setColor] = useState("#fff");
//   const searchQuery = props.searchQuery;
//   const column = props.column;

//   useEffect(() => {
//     if (column === "Rejected") {
//       setColor("#F6F7F8");
//     }
//   }, [setColor, column]);

//   return (
//     <TableCell style={{ backgroundColor: color }}>
//       {props.data
//         .filter((card) => {
//           if (searchQuery === "" || searchQuery === undefined) {
//             return card;
//           } else if (card.toLowerCase().includes(searchQuery.toLowerCase())) {
//             return card;
//           }
//         })
//         .map((card, index) => (
//           <TileCard key={index} card={card} column={column} />
//         ))}
//     </TableCell>
//   );
// };
// export default ColumnBody;

// const TableCell = styled.td`
//   border: 1px solid #ddd;
//   text-align: center;
//   vertical-align: top;
//   position: relative;
//   width: 300px;
// `;