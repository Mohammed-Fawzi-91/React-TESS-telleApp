/*
 * A_TellelisterComponent
 *
 * [Legg inn beskrivelse av komponenten her og hvem som har lagd hva]
 */

/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

const path = "http://localhost:3500/api/v1/files";

const A_Tellelister = () => {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [year, setYear] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`${path}/api/getData`);
                if (Array.isArray(result.data)) {
                    setData(result.data);
                } else {
                    console.error('API response is not an array:', result.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleFileUpload = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!file || !year) {
            setData("missing the file or the year ")
        } else {

            const formData = new FormData();
            formData.append("file", file);
            formData.append("year", year);
            console.log(formData)
            axios
                .post(`${path}/api/add`, formData)
                .then((res) => {
                    setData(res.data);
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000)

                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div>
            <form className="upload-form" onSubmit={handleSubmit}>
                <h3>Upload a file</h3>
                <div className="form-group">
                    <label htmlFor="fileInput">Select a file:</label>
                    <input
                        type="file"
                        className="form-control-file"
                        id="fileInput"
                        onChange={handleFileUpload}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="yearInput">Enter the year:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="yearInput"
                        onChange={(event) => {
                            setYear(event.target.value);
                        }}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Upload
                </button>
                <p className="text-danger">{data}</p>
            </form>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>year</th>
                            <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.year}</td>
                                <td>
                                    <a href={`${path}/api/download/${item._id}`}>Download</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default A_Tellelister;