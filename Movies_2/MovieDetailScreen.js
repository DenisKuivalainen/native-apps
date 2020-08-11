import React from 'react';
import { WebView } from 'react-native-webview'
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';

export default function MovieDetailScreen({ route }) {

    let movie = route.params.movie
    let IMAGEPATH = 'http://image.tmdb.org/t/p/w500';
    let imageurl = IMAGEPATH + movie.backdrop_path;

    return (
      <View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
          <Image source={{uri: imageurl}} style={styles.image}  />
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.text}>{movie.release_date}</Text>
          <Text style={styles.text}>{movie.overview}</Text>
          <View style={{flex: 1}}>
            <Vid aidi={movie.id} />
          </View>
        </ScrollView>
      </View>
    )
}

class Vid extends React.Component {
  constructor(props) {
    super(props);
    this.state = { vids: null };
    this.getMovies = this.getMovies.bind(this);
  } 

  componentDidMount(){
    this.getMovies();
  }

  async getMovies() {
    let VID = this.props.aidi;
    let APIKEY = 'de2fb905cfbdc875a16c7a9856541638';
    let BASEURL = 'https://api.themoviedb.org/3/movie/';
    let url = BASEURL+VID+'?api_key='+APIKEY+'&append_to_response=videos';
    let response = await fetch(url);
    let data = await response.json();
    this.setState( {vids: data.videos.results} );
  }

  render() {
    if(this.state.vids === null) {
      return <></>;
    }
      return this.state.vids.map((val, i) =>{
        return <WebView 
        style={{wigth: "100%", height:200}}
        key={i}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{uri: 'https://www.youtube.com/embed/'+val.key }}
        />
      })
  }
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 670/250
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15
  },
  text: {
    fontSize: 12,
    flexWrap: 'wrap'
  }
});