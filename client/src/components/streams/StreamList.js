import React from 'react';
import {connect} from 'react-redux';
import {fetchStreams} from '../../actions';
import { Link } from 'react-router-dom';

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdmin = (stream) => {
        if(this.props.currentUserId === stream.userId) {
            return (
              <div className="right floated content">
                <Link
                  className="ui button primary"
                  to={`/stream/edit/${stream.id}`}
                >
                  Edit
                </Link>
                <Link
                  className="ui button negative"
                  to={`/stream/delete/${stream.id}`}
                >
                  Delete
                </Link>
              </div>
            );
        }
        else return null;
    }
    renderList = () => {
        return this.props.streams.map( stream => {
            return (<div className="item" key={stream.id}>
                {this.renderAdmin(stream)}
                <i className="large middle aligned icon camera" />
                <div className="content">
                    <Link to={`/stream/${stream.id}`} className="header">
                     {stream.title}
                    </Link>                    
                    <div className="description">
                        {stream.description}
                    </div>
                </div>
                
            </div>);
        });
    }

    renderCreate = () => {
        if(this.props.isSignedIn){
            return (
                <div style={{textAlign: 'right'}}>
                    <Link className="ui button primary" to="/stream/new">Create Stream</Link>
                </div>
            );
        }
    }

    render() {
        return (<div>
            <h2>Streams</h2>
            <div className="ui celled list">
                {this.renderList()}                
            </div>
            {this.renderCreate()}
        </div>);
    }
}
const mapStatetopProps = (state) => {
    return {
        streams: Object.values(state.streams), 
        currentUserId: state.auth.userId, 
        isSignedIn:  state.auth.isSignedIn
    }
}
export default connect(mapStatetopProps, {fetchStreams})(StreamList);