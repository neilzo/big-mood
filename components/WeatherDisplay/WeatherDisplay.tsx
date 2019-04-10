import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { getCurrentWeather } from '../../services/weather';

interface Props {
  onWeatherResult: (weather: object) => void;
}
export default class WeatherDisplay extends Component<Props> {
  constructor(props: any) {
    super(props);

    this.state = {
      weather: null
    };
  }

  componentDidMount() {
    getCurrentWeather().then(weather => {
      this.setState(() => ({ weather }));
      this.props.onWeatherResult(weather);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.weather && (
          <Image
            style={{ width: 58, height: 58 }}
            source={{
              uri: `http://openweathermap.org/img/w/${
                this.state.weather.icon
              }.png`
            }}
          />
        )}
        {this.state.weather && <Text>{this.state.weather.description}</Text>}
        {this.state.weather && <Text>{this.state.weather.temperature}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
