export interface ISearchResult {
    Key: string,
    Type: string,
    LocalizedName: string,
    Country: {
        ID: string,
        LocalizedName: string
    }
}

export interface IMainWeather {
    LocalObservationDateTime: Date | string,
    EpochTime: number,
    WeatherText: string,
    WeatherIcon: number,
    Temperature: {
        Metric: {
            Value: number,
            Unit: "C",
        },
        Imperial: {
            Value: number,
            Unit: "F",
        }
    }
}


export interface IDailyForecasts {
    Date: Date | string,
    EpochDate: number,
    Temperature: {
        Minimum: {
            Value: number,
            Unit: 'F',
        },
        Maximum: {
            Value: number,
            Unit: 'F',
        }
    },
    Day: {
        Icon: number,
        IconPhrase: string,
    },
    Night: {
        Icon: number,
        IconPhrase: string,
    }
}


export interface IFullCityData {
   locationData: ISearchResult
   mainWeather: IMainWeather
   dailyForecasts: IDailyForecasts[]
}