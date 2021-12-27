# npm i dojo-video-player

[![NPM version](https://img.shields.io/npm/v/dojo-video-player.svg?style=flat)](https://npmjs.com/package/dojo-video-player) [![NPM downloads](https://img.shields.io/npm/dm/dojo-video-player.svg?style=flat)](https://npmjs.com/package/dojo-video-player)

## Install

```bash
npm i dojo-video-player
```

## Usage

```js
import React from 'react';
import ReactDOM from 'react-dom';
import DojoVideoPlayer from 'dojo-video-player';

class App extends React.Component {
  render() {
    return (
      <DojoVideoPlayer poster="VIDEO_POSTER.jpg" title="VIDEO_TITLE">
        <source src="VIDEO.mp4" />

        <track
          label="English"
          kind="subtitles"
          srcLang="en"
          src="subtitle-en.vtt"
          default
        />
        <track
          label="German - Deutsch"
          kind="subtitles"
          srcLang="de"
          src="subtitle-de.vtt"
        />
        <track
          label="Turkish"
          kind="subtitles"
          srcLang="tr"
          src="subtitle-tr.vtt"
        />
      </DojoVideoPlayer>
    );
  }
}

ReactDOM.render(<App />, document.body);
```

## License

MIT &copy;
