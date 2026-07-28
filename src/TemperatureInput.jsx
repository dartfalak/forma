
function TemperatureInput({ temp, setTemp}) {
    return (
        <input type="text" value={temp}
        onChange={(e) => setTemp(e.target.value)}
    )
}