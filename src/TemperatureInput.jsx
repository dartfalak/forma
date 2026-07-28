
function TemperatureInput({ temp, setTemp}) {
    return (
        <input type="text" value={temp}
        onChange={(e) => setTemp(e.target.value)}
        placeholder="enter temp"
        />
    );
}

export default TemperatureInput;