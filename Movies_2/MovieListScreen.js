import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';

export default function MovieListScreen({ navigation }) {
  return (
    <>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
            <MovieList navigation={ navigation }/>
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="auto" />
    </>
  );
}

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { movies: null };
    this.getMovies = this.getMovies.bind(this);
  } 

  async getMovies() {
    let APIKEY = 'de2fb905cfbdc875a16c7a9856541638';
    let BASEURL = 'https://api.themoviedb.org/3/movie/now_playing';
    let url = BASEURL+'?api_key='+APIKEY;
    let response = await fetch(url);
    let data = await response.json();
    this.setState( {movies: data.results} );
  }

    itemPressed = (index) => {
        this.props.navigation.navigate(
            'MovieDetails', 
            { movie: this.state.movies[index] }
        );
    }

  render() {
    if (this.state.movies == null){
      return(
        <View style={{flex: 1, padding: 20}}>
          <Text>Loading, please wait...</Text>
        </View>
      )
    }
    var items = this.state.movies.map((movie, index) => {
        return (
            <MovieListItem movie={movie} index={index} key={index} itemPressed={this.itemPressed}/>
        )
      });
    return (
      <ScrollView>
        {items}
      </ScrollView>
    );
  }

  componentDidMount(){
    this.getMovies();
  }
}

class MovieListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    iPressed = (index) => {
        this.props.itemPressed(index);
    }

  render() {
    let IMAGEPATH = 'http://image.tmdb.org/t/p/w500'
    let imageurl = IMAGEPATH + this.props.movie.poster_path;
    return (
        <TouchableHighlight onPress={(e) => this.iPressed(this.props.index)} underlayColor="lightgray" key={this.props.index}>
            <View style={styles.movieItem}>
                <View style={styles.movieItemImage}>
                <Image source={{uri: imageurl}} style={{width: 99, height: 146}} />
                </View>
                <View style={{marginRight: 50}}>
                <Text style={styles.movieItemTitle}>{this.props.movie.title}</Text>
                <Text style={styles.movieItemText}>{this.props.movie.release_date}</Text>
                <Text numberOfLines={6} ellipsizeMode="tail" style={styles.movieItemText}>{this.props.movie.overview}</Text>
                </View> 
            </View>
        </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  movieItem: {
    margin: 5,
    flex: 1,
    flexDirection: 'row'
  },
  movieItemImage: {
    marginRight: 5
  },
  movieItemTitle: {
    fontWeight: 'bold',
  },
  movieItemText: {
    flexWrap: 'wrap'
  }
});
