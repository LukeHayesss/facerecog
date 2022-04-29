import Navbar from "./components/Navbar";
import { useState } from "react";
import "./App.css"
import { useEffect } from "react";
import NewPost from "./components/NewPost";


const App = () => {
  const [file, setFile] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    const getImage = () => {
      const img = new Image()
      img.src = URL.createObjectURL(file);
      img.onload = () => {
      setImage ({
        url: img.src,
        width: img.width,
        height: img.height,
      });  
      }
    };

    file && getImage();
  }, [file]);

  return (
    <div>
      <Navbar />
      {image ? (<NewPost image={image}/>) : (

      
//profile photo//
      <div className="newPostCard">        
        <div className="addPost">
          <img
          // src="https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?cs=srgb&dl=pexels-mentatdgt-937481.jpg&fm=jpg"
          src="https://anotherimg-dazedgroup.netdna-ssl.com/1149/34-34-1149-766/azure/another-prod/370/2/372730.jpg"
          alt=""
          className="avatar"
          />
{/* main input           */}
          <div className="postForm">
            <input
            type="text"
            placeholder="Whatcha Thinking?"
            className="postInput"
            />

            <label htmlFor="file">
{/* upload image icon */}
                <img
                className="addImg"
                src="https://cdn.icon-icons.com/icons2/564/PNG/512/Add_Image_icon-icons.com_54218.png"
                alt=""
                />
{/* location icon                 */}
                <img
                className="addImg"
                src="https://icon-library.com/images/maps-icon-png/maps-icon-png-5.jpg"
                alt=""
                />
{/* calender icon                 */}
                <img
                className="addImg"
                src="https://d29fhpw069ctt2.cloudfront.net/icon/image/84451/preview.svg"
                alt=""
                />
                <button>Post</button>
            </label>
            <input onChange={(e) => setFile(e.target.files[0])}
              id="file" 
              style={{display:"none"}} 
              type="file"
              />
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default App;
