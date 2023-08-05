
import react, { useState } from 'react';
import axios from "axios"
import "./navbar.css";

export default function Navbar() {
    const [name, setName] = useState("")
    const [image, setImage] = useState([]);
    let url = `https://api.unsplash.com/search/photos?page=1&query=${name}&client_id=BWuDdG2RunNqkuLOwi18HWeVYs13seMMmb-w0j2eOgU`

    const handleClick = async (e) => {
        e.preventDefault();;
        try {
            console.log("clicked")
            let res = await axios.get(url);
            //  console.log(res.data.results)

            setImage(res.data.results)
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <>

            <div className="navbarcss">
                <div className="rightnav">PhotoGallery</div>
                <div className="leftnav">
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="searchinput" placeholder ="enter some text ..."></input>
                    <button className="searchbutton" onClick={(e) => handleClick(e)}>Search</button>
                </div>
            </div>

            <div className="picturegallery">
                {
                    image.map((data) => {
                        return (
                            <div key={data.id} className="imagebox">
                                <img src={data.urls.regular} alt={data.alt_description || "No description"} />
                                <h4>auther: {data.user.name}</h4>
                                <span>{data.description || "No description"}</span>
                                <p><a href={data.links.html} target = "_blank" >click to view more</a></p>
                            </div>

                        )
                    })
                }
            </div>

        </>
    )
}