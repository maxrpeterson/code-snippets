var CommentBox = React.createClass({
  render() {
    return (
      <div id="container" className="comment-box" style={{border: "1px solid red"}}>
      Hello, world! I am a CommentBox
      {this.props.something}
      <CommentList comments={this.props.data}/>
      <CommentForm/>
      </div>
    );
  }
});

var CommentList = React.createClass({
  render() {
    var commentNodes = this.props.comments.map(function(comment) {
      return (
				<Comment author={comment.author}>
        	{comment.text}
        </Comment>
    	)
   	});
    return (
      <div className="comment-list" style={{border: "1px solid green"}}>{commentNodes}</div>
    );
  }
});

var CommentForm = React.createClass({
  render() {
    return (
      <div className="comment-form">
      Hello World I am a CommentForm
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
		return(
      <div className="comment" style={{border: "1px dotted gray"}}>
      	<h4 className="comment-author">
        	{this.props.author}
      	</h4>
      {this.props.children}
    	</div>
    );
  }
});

var comments = [
  {author: "max", text: "wuuuuut"},
  {author: "stevesy", text: "shut up max"}
];

React.render(<CommentBox data={comments}/>,document.body);
