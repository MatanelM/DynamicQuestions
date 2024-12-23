import React, { useState } from "react";
import axios from "axios";

const InputContainer = () => {
  const [option, setOption] = useState("upload");
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");

  const handleOptionChange = (newOption) => {
    setOption(newOption);
    setFile(null);
    setLink("");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      console.log(file, option, link)
      if (option === "upload" && file) {
        formData.append("file", file); // Add the file
        const response = await axios.post("https://www.landa.wiki/questions/pdf_file", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            timeout: 15000,
          });
        console.log("Response:", response.data);
      } else if (option === "link" && link) {
        formData.append("link", link); // Add the link
        const response = await axios.post("https://www.landa.wiki/questions/pdf_link", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            timeout: 15000,
          });
        console.log("Response:", response.data);
      }

      // Send the request
    //   const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });

      
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.switchContainer}>
        <button
          onClick={() => handleOptionChange("upload")}
          style={{
            ...styles.switchButton,
            backgroundColor: option === "upload" ? "#007BFF" : "#E0E0E0",
            color: option === "upload" ? "#FFF" : "#000",
          }}
        >
          Upload
        </button>
        <button
          onClick={() => handleOptionChange("link")}
          style={{
            ...styles.switchButton,
            backgroundColor: option === "link" ? "#007BFF" : "#E0E0E0",
            color: option === "link" ? "#FFF" : "#000",
          }}
        >
          Link
        </button>
      </div>

      <div style={styles.inputContainer}>
        {option === "upload" ? (
          <input type="file" onChange={handleFileChange} style={styles.input} />
        ) : (
          <input
            type="text"
            placeholder="Enter a link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            style={styles.input}
          />
        )}
      </div>

      <button onClick={handleSubmit} style={styles.button}>
        Submit
      </button>
    </div>
  );
};


const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    border: "1px solid #CCC",
    borderRadius: "8px",
    width: "400px",
    margin: "auto",
    marginTop: "50px",
  },
  switchContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  switchButton: {
    flex: 1,
    padding: "10px",
    margin: "0 5px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  inputContainer: {
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #CCC",
    borderRadius: "4px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#FFF",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default InputContainer;
