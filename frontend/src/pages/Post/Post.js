import "./Post.css";
import { useParams } from "react-router-dom";


function Post() 
{
    const { id } = useParams()
    let ownpost = true;


    return (
        <div>
        <div id="postdiv">
            <h1>Testing Post<small>by test author</small></h1>
            <div>
                This is a test post
            </div>
            {ownpost ? <div><button id="btns-delete" class="btn">Delete</button>
            <button id="btns-edit" class="btn">Edit</button></div> : ""}
        </div> 
        </div>
      )
}


export default Post;
