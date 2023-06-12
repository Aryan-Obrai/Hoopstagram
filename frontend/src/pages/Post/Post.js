import { useParams } from "react-router-dom";

import "./Post.css";
import React from 'react'

const PostWrapper = () => {
  const { id } = useParams();
  return <Post id={id}  />;
};

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      id: null,
    };
  }

  componentDidMount() {
    const { id } = this.props;
    this.setState({ id }, () => {
      this.getData();
    });
  }

  async getData() {
    const res = await fetch(`http://localhost:5000/post/view/${this.state.id}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    this.setState({ data });
  }

    handleDelete = () => {
        const { id } = this.state;

        fetch("http://localhost:5000/post/delete", {
            method: "DELETE",
            mode: "cors",
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ id: id }),
        })
        .then((res) => { 
            window.location.href = "/feed"
        })
        
 
    };

  handleEdit = () => {
    // Perform the edit action
    // Add your code here to handle the edit functionality
    console.log("Edit action triggered");
  };

  render() {
    if (this.state.data == null) {
      return (
        <div>
          <div id="postdiv">
            <h1>Loading <small>by loading</small></h1>
            <div>
              Loading
            </div>
          </div> 
        </div>
      );
    } else {
      return (
        <div>
          <div id="postdiv">
            <h1>{this.state.data.post.title} <small>by {this.state.data.author}</small></h1>
            <div>
              {this.state.data.post.text}
            </div>
            {this.state.data.ownpost ? (
              <div>
                <button id="btns-delete" className="btn" onClick={this.handleDelete}>Delete</button>
              </div>
            ) : ""}
          </div> 
        </div>
      );
    }
  }
}

export default PostWrapper;
