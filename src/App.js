import {useState} from "react";

const App = () => {
    const [images, setImages] = useState(null);
    const [value, setValue] = useState(null);
    const getImages = async () => {
        try {
            const options = {
                method: "POST",
                body: JSON.stringify({
                    message: value
                }),
                headers: {
                    "Content-type": "application/json"
                }
            }
            const response = await fetch('http://localhost:8000/images', options);
            const data = await response.json();
            console.log(data);
            setImages(data);
        } catch (error) {
            console.error(error);
        }
    }
    console.log(value);

    return (
        <div className="app">
            <section className="search-section">
                <p>
                    <span className="surprise">TẠO ẢNH BẰNG AI</span>
                </p>
                <div className="input-container">
                    <input
                        value={value}
                        placeholder="Nhập nội dung..."
                        onChange={e => setValue(e.target.value)}
                    />
                    <button onClick={getImages}>Generate</button>
                </div>
            </section>
            <section className="image-section">
                {images?.map((images, _index) => (
                    <img key={_index} src={images.url} alt={`Generated img of ${value}`}/>
                ))}
            </section>
        </div>
    );
}

export default App;
