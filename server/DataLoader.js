const fetch   = require('node-fetch');
const fs      = require('fs');
const path    = require('path');

module.exports = class DataLoader{
  constructor(socket){
    this.socket   = socket;
    this.errorLog = [];

    this.config        = {};
    this.configLoaded  = false;

    this.localDb       = {test:"test"};
    this.dbFileLoaded  = false;
    this.dbFileBusy    = false;

    this.usersUpdated = 0;

    this.helixQueried  = false;

    this.loadConfigFile();

    this.socket.on("CLIENT_REQUEST", (data) => {
      this.clientRequest();
    });

    this.fetchUserData = this.fetchUserData.bind(this);
    this.fetchClipData = this.fetchClipData.bind(this);
  }

  loadConfigFile(){
    fs.readFile(path.join(__dirname, "/config.json"), (err, data) => {
      if(err) this.errorLog.push({error:err, location:"loadConfigFile | fs.readFile"});
      else{
        this.config       = JSON.parse(data);
        this.configLoaded = true;
        this.loadDbFile();
      }
    });
  }

  loadDbFile(){
    if(!this.dbFileLoaded){
      this.dbFileBusy = true;
      fs.readFile(path.join(__dirname, "/localDB.json"), (err, data) => {
        if(err) this.errorLog.push({error:err, location:"loadDbFile | fs.readFile"});
        else{
          this.localDb      = JSON.parse(data);
          this.dbFileLoaded = true;
          this.dbFileBusy   = false;
        }
      });
    }

    // Check the last time this file was updated. Update all if necessary.
    let current = Date.now();
    if(!this.helixQueried || current - this.helixQueried >= 259200000 && !this.localDbBusy){
      this.localDbBusy = true;
      for(var a = 0; a < this.config.userList.length; a++){
        this.fetchUserData(this.config.userList[a]);
        if(a == this.config.userList.length-1){
          this.localDbBusy = false;
        }
      }
    }
  }

  clientRequest(){
    if(this.dbFileLoaded){
      if(Object.keys(this.localDb).length > 0){
        for (var k in this.localDb) {
          if (this.localDb.hasOwnProperty(k)) {
           this.lazyLoad(this.localDb[k]);
          }
        }
      }
      else if(!this.localDbBusy){
        this.localDbBusy = true;
        for(var a = 0; a < this.config.userList.length; a++){
          this.fetchUserData(this.config.userList[a], true);
          if(a == this.config.userList.length-1){
            this.localDbBusy = false;
          }
        }
      }
    }
  }

  fetchUserData(username, clientRequested=false){
    let url = 'https://api.twitch.tv/helix/users?login=' + username;

    fetch(url, {
      headers: { 'Client-ID': this.config.clientId }
    }).then(results => { return results.json(); })
    .then(data => {
      if(data.error){
        this.errorLog.push(data.error);
      }
      else{
        let user = {
          user_id:          data.data[0].id,
          login:            data.data[0].login,
          display_name:     data.data[0].display_name,
          broadcaster_type: data.data[0].broadcaster_type,
          description:      data.data[0].description
        };

        this.fetchClipData(user, clientRequested);
      }
    });
  }

  fetchClipData(user, clientRequested=false){
    let url = 'https://api.twitch.tv/helix/clips?';

    fetch(url + 'broadcaster_id=' + user.user_id, {
      headers: { 'Client-ID': this.config.clientId }
    }).then(results => { return results.json();
    }).then(data => {
      if(data.error){
        this.errorLog.push(data.error);
      }
      else{
        // Clone the array and shuffle it
        let fullArr = data.data.sort(() => Math.random() - 0.5);

        // Take the first 5
        let slicedArr = [];
        if(fullArr.length > 20){ slicedArr = fullArr.slice(0, 20); }
        else{ slicedArr = fullArr; }

        // Clips is an array used by the client.
        user.clips = [];
        for(let a = 0; a < slicedArr.length; a++){
          user.clips.push(slicedArr[a].id);
        }

        this.localDb[user.login] = user;
        this.usersUpdated++;
        if(this.usersUpdated >= this.config.userList.length-1){
          this.saveDbFile();
        }

        if(clientRequested){
          this.lazyLoad(user);
        }
      }
    });
  }

  lazyLoad(user){
    this.socket.emit("USER_READY", user);
  }

  saveDbFile(){
    this.dbFileBusy = true;
    let jsonContent = JSON.stringify(this.localDb);
    fs.writeFile(path.join(__dirname, "/localDB.json"), jsonContent, (err) => {
      if(err){ this.errorLog.push({error:err, location:"saveDbFile | fs.writeFile"}); }
      else{ this.dbFileBusy = false; }
    });
  }
}
