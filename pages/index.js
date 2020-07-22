import axios from "axios";
import config from "../config.json";
import Head from "next/head";

console.log(config.discord.clientID);

const API = "http://localhost:3000/api";

class UserPage extends React.Component {
  static getInitialProps = async ctx => {
    let username = config.user.username;

    const _CHANNELS = "https://mixer.com/api/v1/channels";

    const res = await axios(`${_CHANNELS}/${username}`);

    return {
      mixer: res.data
    };
  };

  render() {
    let mixer = this.props.mixer;

    // Event Checker

    let id;
    let scene = config.user.currentScene;

    if (scene === "start") {
      id = 0;
    } else if (scene === "brb") {
      id = 1;
    } else if (scene === "end") {
      id = 2;
    } else {
      id = 3;
      return null;
    }

    let eventname = mixer.type.name;
    let eventdesc = mixer.type.description;

    let scenetitle = config.scenes[id].name;
    let scenedesc = config.scenes[id].desc;
    let prenup = config.scenes[id].prenup;

    if (eventname === "Creative") {
      eventname = config.events[0].name;
      eventdesc = config.events[0].desc;
    }
    if (eventname === "Development") {
      eventname = config.events[1].name;
      eventdesc = config.events[1].desc;
    }

    let sceneChecker = config.user.background;

    if (config.user.currentScene === "game") {
      sceneChecker = "transparent !important";
    } else {
      sceneChecker;
    }

    let userData = (
      <div
        className="container"
        style={{
          fontFamily: config.user.font,
          background: sceneChecker,
          overflow: 'auto',
          borderRadius: config.user.corners,
        }}
      >
        <Head>
          <title>Cheese.media</title>
        </Head>
        <div className="main padfix">

          <div className="flex">
          <h1 className="logo" style={{color: config.user.colorSecondary, textTransform: "uppercase", fontSize: config.logo.size}}> <span style={{color: config.user.color, fontSize: config.logo.size2, textTransform: "lowercase", marginRight: 15}}>{config.user.username}</span>{config.logo.portfolio}</h1>
          </div>
          <div className="herocont">
            <div>
              <img className="avatar" style={{height: config.avatar.size }} src={`https://mixer.com/api/v1/users/${mixer.userId}/avatar`} />
              <h1 className="title" style={{ color: config.user.color, fontSize: config.web.titleSize }}>{config.web.title}</h1>
              <p className="subtitle" style={{color: config.user.colorSecondary, fontSize: config.web.subtitleSize}}>{config.web.subtitle}</p>
            </div>
          </div>
            <div className="showcasecont">
              <img className="showcase" src="heroimage.png"/>
     <a href="https://dribbble.com/CheeseHai"> 
      <button className="mainbutton" 
      style={{color: config.web.mainbutton.color, background: config.web.mainbutton.background 
      }}><i class="fab fa-dribbble"></i> {config.web.mainbutton.text}</button></a>
            </div>
        </div>
      </div>
    );

    if (config.currentScene === "game") {
      return <body style={{ background: "transparent !important"}}></body>;
    } else {
      return userData;
    }
  }
}

export default UserPage;
