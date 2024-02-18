import pkg from "pg";

const { Pool } = pkg;

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getSongsOnPlaylist(playlistId) {
    const queryPlaylist = {
      text: "SELECT id, name FROM playlists WHERE id = $1",
      values: [playlistId],
    };

    const querySongs = {
      text: "SELECT songs.id, songs.title, songs.performer FROM songs INNER JOIN playlist_songs ON songs.id = playlist_songs.song_id WHERE playlist_songs.playlist_id = $1",
      values: [playlistId],
    };

    const [{ rows: songs }, { rows: playlist }] = await Promise.all([this._pool.query(querySongs), this._pool.query(queryPlaylist)]);

    return {
      ...playlist[0],
      songs,
    };
  }
}

export default PlaylistsService;
