import { IFullCityData, ISearchResult } from '@/interfaces/weather-data.interface';
import { WeatherAPIService } from './weather.api.service';
import moment from 'moment';


export class WeatherService {
    private weatherApiService: WeatherAPIService;
    defaultCity: ISearchResult = {
        Key: '215854',
        Type: 'City',
        LocalizedName: 'Tel Aviv',
        Country: {
            ID: 'IL',
            LocalizedName: 'Israel'
        }
    }


    constructor() {
        this.weatherApiService = new WeatherAPIService()
    }

    async searchForCities(txt: string) {
        return await this.weatherApiService.getAutoComplete(txt)
    }

    async getCurrCard() {
        let card = this.loadSavedCard()
        if (!card) {
            let currentCity :ISearchResult
            if (!navigator.geolocation) {
                currentCity = this.defaultCity;
            } else {
                currentCity = await this.getGeolocationCity()
            }
            const currWeather = await this.weatherApiService.getCurrentConditions(currentCity.Key)
            const dailyForecsts = await this.weatherApiService.getDailyForecasts(currentCity.Key)
            card = { locationData: currentCity, mainWeather: currWeather, dailyForecasts: dailyForecsts }
            this._saveToLocalStorage('savedCard', card)
        }
        return card;
    }

    async getGeolocationCity() {
        try {
            const {latitude, longitude} = await this.getCurrentPosition()
            const locationData = await this.weatherApiService.getlocationData(latitude, longitude)
            return locationData;
            
        } catch (error) {
            return this.defaultCity;
        }

    }


    async getCurrentPosition():Promise<{latitude:number, longitude:number}> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve(position.coords);
                },
                (error) => {
                    reject(error);
                }
            );
        });

    }


    async getCard(locationData: ISearchResult) {
        const currWeather = await this.weatherApiService.getCurrentConditions(locationData.Key)
        const dailyForecsts = await this.weatherApiService.getDailyForecasts(locationData.Key)
        const card = { locationData: locationData, mainWeather: currWeather, dailyForecasts: dailyForecsts }
        this._saveToLocalStorage('savedCard', card)
        return card;
    }

    loadSavedCard() {
        const storageCard = localStorage.getItem('savedCard')
        if (storageCard) {
            let savedCard: IFullCityData | null = JSON.parse(storageCard)
            if (!savedCard) return;
            const diffDays = this.isSameDay(savedCard.mainWeather.LocalObservationDateTime)
            if (!diffDays) {
                return;
            }
            return savedCard;
        }

    }

    isSameDay(cardDate: string | Date) {
        const momentCardDate = moment(cardDate)
        const momentToday = moment()
        return momentCardDate.isSame(momentToday, 'date')
    }


    _saveToLocalStorage(keyname: string, card: object) {
        localStorage.setItem(keyname, JSON.stringify(card))
    }
}

