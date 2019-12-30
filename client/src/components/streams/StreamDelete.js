import React from "react";
import { connect } from "react-redux";
import Modal from "../modal";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions";
import { Link } from "react-router-dom";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions = () => {
    return (
      <React.Fragment>
        <button className="ui button negative" onClick={this.DeleteStream}>Delete</button>
        <Link className="ui button" to='/'>Cancel</Link>
      </React.Fragment>
    );
  };

  DeleteStream = () => {
    this.props.deleteStream(this.props.match.params.id);
  }
  

  renderContent = () => {
    if (!this.props.stream)
      return "Are you sure you want to delete this stream";
    else
      return `Are you sure you want to delete the stream with title:  ${this.props.stream.title} ?`;
  };
  render() {
    if (!this.props.stream) return null;
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
