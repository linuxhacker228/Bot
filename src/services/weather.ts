import { ConfigService } from "./config";

export class Weather {
    private req: string = "https://api.openweathermap.org/data/2.5/weather"
    constructor(private _config: ConfigService ) {}
    public async search(city: string) {
        const api = this._config.get("API_KEY");
        console.log(api)
        const url = `${this.req}?q=${encodeURIComponent(city)}&appid=${api}&units=metric&lang=uk`;
        const response = await fetch(url);
        const data = await response.json();
        if(!response.ok) {
            throw new Error(`Город не найден`);
        }
        return data;
    }
}