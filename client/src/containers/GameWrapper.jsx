import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import io from 'socket.io-client';

import * as Actions from '../actions';

import Game from '../components/Game';
import Room from '../components/Room';

class GameWrapper extends React.Component {
  constructor() {
    super();
    this.socket = io();
  }
  componentWillMount() {
    //refactor this!
    var login = this.props.actions.login;
    var socket = this.socket;

    //Connect to server
    socket.on('hello', function(hi) {
      console.log('server said', hi);
    });
    socket.on('connect', function() {
      login(this.socket.id);
      
      const peer = new Peer (this.socket.id, {host: 'ancient-caverns-19863.herokuapp.com', port: '', secure: 'true'});
      
      //Connection for audio
      peer.on('open', function(id) {
      });
    }.bind(this));
    socket.on('lobbyInfo', function(lobbyState) {
      //Gives you array of room objects
      //ie: [{id: 'something', status: 'something', max: 'something'},...]
      this.setState({});
      var roomNumber = 1;
      for (var key in lobbyState) {
        this.state[roomNumber] = {
          id: key,
          status: lobbyState[key].status
        };
        roomNumber++;
      }
    }.bind(this));
  }

  onClick(e) {
    var socket = this.socket;
    this.props.actions.setGameRoom(this.state[e.target.value].id);
    console.log('This is what I am sending back to June', this.state[e.target.value].id);
  }

  render() {
    var matchMaking = this.props.playing ? 
      <Game socket={this.socket} />
      :
      this.props.roomNumber ?  
      <Room socket={this.socket} />
      : (
        <div className='buttons'>
          <button className='button' onClick={this.onClick.bind(this)} value='1'>Lobby Room 1</button>
          <button className='button' onClick={this.onClick.bind(this)} value='2'>Lobby Room 2</button>   
          <button className='button' onClick={this.onClick.bind(this)} value='3'>Lobby Room 3</button>   
          <button className='button' onClick={this.onClick.bind(this)} value='4'>Lobby Room 4</button>   
        </div>
      );

      //Todo: When clicking to join a room, send off signal 'joinRoom'
      //with room id. Send as string.
    return (
      <div className='text-center'>
        {matchMaking} 
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    playing: state.gameState,
    currentUser: state.currentUser,
    roomNumber: state.room.roomNumber
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameWrapper);


