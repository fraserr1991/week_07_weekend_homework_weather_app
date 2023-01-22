import '../forecast/Forecast.css'
//Accordian gives functionality for realated containers
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemPanel, AccordionItemButton } from "react-accessible-accordion"

const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const Forecast = ({ forecastData }) => {
    const dayInAWeek = new Date().getDay()
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek))

    return (
        <>
            <label className="title">Daily</label>
            <Accordion allowZeroExpanded>
                {forecastData.list.splice(0, 7).map((item, index) => (
                    <AccordionItem key={index}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="daily-item">
                                    <img alt="weather"
                                        className="icon-small"
                                        src={`icons/${item.weather[0].icon}.png`}
                                    />
                                    <label className="day">{forecastDays[index]}</label>
                                    <label className="description">
                                        {item.weather[0].description}
                                    </label>
                                    <label className="min-max">
                                        {Math.round(item.main.temp_max)}°c /{" "}
                                        {Math.round(item.main.temp_min)}°c
                                    </label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel><div className="daily-details-grid">
                            <div className="daily-details-grid-item">
                                <label>Pressure</label>
                                <label>{item.main.pressure}</label>
                                <label>Humidity</label>
                                <label>{item.main.humidity}</label>
                            </div>
                        </div></AccordionItemPanel>
                    </AccordionItem>
                ))}

            </Accordion>
        </>
    )
}

export default Forecast