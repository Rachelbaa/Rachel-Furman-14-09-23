import axios from "axios";
import { IDailyForecasts, IMainWeather, ISearchResult } from '@/interfaces/weather-data.interface';


export class WeatherAPIService {

    private apiKey: string = 'eokdHD39sJEVmIcVIjDBQkoO9Nu42fx9';
    private defaultUrl: string = 'https://dataservice.accuweather.com';

    async getlocationData(latitude:number, longitude:number) {
        const url = this.defaultUrl + `/locations/v1/cities/geoposition/search?apikey=${this.apiKey}&q=${latitude}%2C${longitude}`
        const res = await axios.get(url);
        const locationData: ISearchResult = res.data;
        return locationData;
    }
    
    async getAutoComplete(text: string) {
        const url = this.defaultUrl + `/locations/v1/cities/autocomplete?apikey=${this.apiKey}&q=${text}`
        const res = await axios.get(url)
        const cities: ISearchResult[] = res.data;
        return cities
    }
    
    async getCurrentConditions(key: string) {
        const url = this.defaultUrl + `/currentconditions/v1/${key}?apikey=${this.apiKey}`
        const res = await axios.get(url)
        const currWeather: IMainWeather = res.data[0];
        return currWeather;
    }

    async getDailyForecasts(key: string) {
        const url = this.defaultUrl + `/forecasts/v1/daily/5day/${key}?apikey=${this.apiKey}`
        const res = await axios.get(url)
        const dailyForecsts: IDailyForecasts[] = res.data.DailyForecasts;
        return dailyForecsts;
    }




}


